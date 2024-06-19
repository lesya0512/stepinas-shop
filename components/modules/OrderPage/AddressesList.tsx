import { getCDEKOfficesByCityFx, setChoosenPickupAddressData, setShouldLoadCDEKData } from '@/context/order';
import { $cdekDataByCity, $choosenPickupAddressData, $shouldLoadCDEKData } from '@/context/order/state';
import { useTTMap } from '@/hooks/useTTMap';
import { ICDEKAddressData } from '@/types/order';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUnit } from 'effector-react';
import DeliveryAddressItem from './DeliveryAddressItem';
import styles from '@/styles/order/index.module.scss'


const AddressesList = ({ listClassName }: { listClassName: string }) => {
  const cdekDataBySity = useUnit($cdekDataByCity)
  const choosenPickupAddressData = useUnit($choosenPickupAddressData)
  const shouldLoadCDEKData = useUnit($shouldLoadCDEKData)
  const { handleSelectAddress } = useTTMap()
  const loadCDEKDataSpinner = useUnit(getCDEKOfficesByCityFx.pending)

  const handleChoosenAddressData = (data: Partial<ICDEKAddressData>) => {
    setShouldLoadCDEKData(false)
    setChoosenPickupAddressData(data)
  }

  return (
    <>
      {shouldLoadCDEKData && (
        <>
          {loadCDEKDataSpinner && (
            <span className={styles.order__list__item__delivery__inner__spinner}>
              <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='2x' />
            </span>
          )}
          {!loadCDEKDataSpinner && (
            <ul className={`list-reset ${listClassName}`}>
              {cdekDataBySity?.length ? (
                cdekDataBySity.map((item) => (
                  <DeliveryAddressItem 
                    key={item.place_id}
                    addressItem={item}
                    handleChosenAddressData={handleChoosenAddressData}
                    handleSelectAddress={handleSelectAddress}
                  />
                ))
              ) : (
                 <span>Ничего не найдено</span>
              )}
            </ul>
          )}
        </>
      )}
      {!!choosenPickupAddressData.address_line1 && !shouldLoadCDEKData && (
        <div className={styles.order__list__item__delivery__pickup__choose}>
          <span>{choosenPickupAddressData.address_line1}</span>
          <span>
            {choosenPickupAddressData.address_line2},{' '}
            {choosenPickupAddressData.city}
          </span>
        </div>
      )}
    </>
  );
};

export default AddressesList;