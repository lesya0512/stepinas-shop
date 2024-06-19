'use client'
import { $choosenPickupAddressData, $deliveryTab, $pickupTab } from "@/context/order/state";
import { useUnit } from "effector-react";
import OrderTitle from "./OrderTitle";
import styles from '@/styles/order/index.module.scss';
import { motion } from "framer-motion";
import { basePropsForMotion } from "@/constants/motion";
import { $userGeolocation, getGeolocationFx, setUserGeolocation } from "@/context/user";
import toast from "react-hot-toast";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { setDeliveryTab, setMapInstance, setPickupTab } from "@/context/order";
import TabControls from "./TabControls";
import AddressesList from "./AddressesList";
import { addScriptToHead } from "@/lib/utils/common";
import { useTTMap } from '@/hooks/useTTMap';
import { SearchMarkersManager, handleResultClearing, handleResultSelection, handleResultsFound, handleSelectPickupAddress, initSearchMarker } from "@/lib/utils/map";
import { IAddressBBox } from "@/types/order";
import dynamic from 'next/dynamic';

const OrderDelivery = () => {
  const deliveryTab = useUnit($deliveryTab);
  const pickupTab = useUnit($pickupTab);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const userGeolocation = useUnit($userGeolocation);
  const choosenPickupAddressData = useUnit($choosenPickupAddressData);
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  const labelRef = useRef() as MutableRefObject<HTMLLabelElement>;
  const { handleSelectAddress } = useTTMap();

  const handlePickupTab = () => {
    if (pickupTab) {
      return;
    }

    setPickupTab(true);
    setDeliveryTab(false);

    if (choosenPickupAddressData.address_line1) { 
      handleLoadMap(
        choosenPickupAddressData.city, 
        {
          lat: choosenPickupAddressData.lat as number, 
          lng: choosenPickupAddressData.lon as number
        }, 
        true
      );
      return;
    }

    if (userGeolocation?.features) {
      handleLoadMap(userGeolocation?.features[0].properties.city);
      return;
    }

    handleLoadMap();
  };

  const handleDeliveryTab = () => {
    if (deliveryTab) {
      return;
    }
    setPickupTab(false);
    setDeliveryTab(true);
  };

  useEffect(() => {
    getUserGeolocation();
  }, []);

  useEffect(() => {
    if (shouldLoadMap) {
      addScriptToHead(
        'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.1.2-public-preview.15/services/services-web.min.js'
      );
      addScriptToHead(
        'https://api.tomtom.com/maps-sdk-for-web/cdn/plugins/SearchBox/3.1.3-public-preview.0/SearchBox-web.js'
      );
      handleLoadMap();
    }
  }, [shouldLoadMap]);

  const getUserGeolocation = () => {
    const success = async (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;

      try {
        const result = await getGeolocationFx({ lat: latitude, lon: longitude });

        if (!result) {
          return;
        }

        setUserGeolocation(result.data);
        setShouldLoadMap(true);
      } catch (error) {
        console.error(error);
        setShouldLoadMap(true);
      }
    };

    const error = (error: GeolocationPositionError) => {
      setShouldLoadMap(true);
      toast.error(`${error.code} ${error.message}`);
    };

    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      toast.error('Geolocation is not supported by this browser.');
      setShouldLoadMap(true);
    }
  };

  const handleLoadMap = async (
    initialSearchValue = '',
    initialPosition = {
      lat: 59.937542,
      lng: 30.316284,
    }, withMarker = false
  ) => {
    const ttMaps = await import(`@tomtom-international/web-sdk-maps`);

    const map = ttMaps.map({
      key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY as string,
      container: mapRef.current,
      center: initialPosition,
      zoom: 10,
    });
    
    setMapInstance(map);
    withMarker && handleSelectAddress(
      choosenPickupAddressData.bbox as IAddressBBox,
      {
        lat: choosenPickupAddressData.lat as number, 
        lon: choosenPickupAddressData.lon as number
      }, 
      map
    );

    const options = {
      searchOptions: {
        key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY as string,
        language: "ru-RU", 
        limit: 5,
      },
      autocompleteOptions: {
        key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY as string,
        language: "ru-RU",
      },
    };

    initSearchMarker(ttMaps);

    //@ts-ignore
    const ttSearchBox = new tt.plugins.SearchBox(tt.services, options);

    const searchBoxHTML = ttSearchBox.getSearchBoxHTML();
    searchBoxHTML.classList.add('delivery-search-input');
    labelRef.current.append(searchBoxHTML);

    initialSearchValue && ttSearchBox.setValue(initialSearchValue);

    //@ts-ignore
    const searchMarkersManager = new SearchMarkersManager(map);
    //@ts-ignore
    ttSearchBox.on('tomtom.searchbox.resultsfound', (e) =>
      handleResultsFound(e, searchMarkersManager, map)
    );
    //@ts-ignore
    ttSearchBox.on('tomtom.searchbox.resultselected', (e) =>
      handleResultSelection(e, searchMarkersManager, map)
    );
    //@ts-ignore
    ttSearchBox.on('tomtom.searchbox.resultscleared', () =>
      handleResultClearing(searchMarkersManager, map, userGeolocation)
    );

    if (userGeolocation?.features && !withMarker) {
      ttSearchBox.setValue(initialSearchValue);
      handleSelectPickupAddress(userGeolocation?.features[0].properties.city);
      
      map
        .setCenter([
          userGeolocation?.features[0].properties.lon,
          userGeolocation?.features[0].properties.lat,
        ])
        .zoomTo(10);
    }
  };

  return (
    <>
      <OrderTitle orderNumber='2' text='Доставка' />
      <div className={styles.order__list__item__delivery}>
        <TabControls
          handleTab1={handlePickupTab}
          handleTab2={handleDeliveryTab}
          tab1Active={pickupTab}
          tab2Active={deliveryTab}
          tab1Text="Доставка (СДЭК)"
          tab2Text="Самовывоз"
        />
        {pickupTab && (
          <motion.div
            className={styles.order__list__item__delivery__pickup}
            {...basePropsForMotion}
          >
            <div className={styles.order__list__item__delivery__inner}>
              <label
                className={styles.order__list__item__delivery__label}
                ref={labelRef}
              >
                <span>Выберите город и выберите пункт выдачи на карте:</span>
              </label>
              <AddressesList
                listClassName={styles.order__list__item__delivery__list}
              />
            </div>
            <div
              className={styles.order__list__item__delivery__map}
              ref={mapRef}
            />
          </motion.div>
        )}
        {deliveryTab && (
          <motion.div
            {...basePropsForMotion}
          >
            <h3>В данный момент самовывоз не осуществляется</h3>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(OrderDelivery), { ssr: false });
