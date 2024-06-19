import autosize from 'autosize'
import styles from '@/styles/order/index.module.scss'
import { useEffect, useState } from 'react';
import { FieldErrorsImpl, useForm } from 'react-hook-form';
import { emailValidationRules, nameValidationRules, phoneValidationRules } from '@/lib/utils/auth';
import NameErrorMessage from '@/components/elements/nameErrorMessage/NameErrorMessage';
import { IInputs } from '@/types/auth-popup';

const OrderDetalisForm = () => {
  const [messageLength, setMessageLength] = useState(0)
  const {
    register,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm()

  const nameRegister = register(
    'name_label',
    nameValidationRules('неверное значение')
  )

  const surnameRegister = register(
    'surname_label',
    nameValidationRules('неверное значение')
  )

  const phoneRegister = register(
    'phone_label',
    phoneValidationRules('неверное значение')
  )

  const emailRegister = register(
    'email_label',
    emailValidationRules('неверное значение')
  )

  const messageRegister = register('message_label', { maxLength: 255 })


  const handleDetailsInputFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => e.target.classList.add(styles.with_value)

  const handleDetailsInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (e.target.value) {
      return
    }

    e.target.classList.remove(styles.with_value)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    nameRegister.onChange({
      target: {
        name: nameRegister.name,
        value,
      },
    })
    // setOrderDetailsValues({
    //   ...inputs,
    //   isValid,
    //   name_label: value,
    // })
    trigger(nameRegister.name)
  }

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    surnameRegister.onChange({
      target: {
        name: surnameRegister.name,
        value,
      },
    })
    // setOrderDetailsValues({
    //   ...inputs,
    //   isValid,
    //   surname_label: value,
    // })
    trigger(surnameRegister.name)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    phoneRegister.onChange({
      target: {
        name: phoneRegister.name,
        value,
      },
    })
    // setOrderDetailsValues({
    //   ...inputs,
    //   isValid,
    //   phone_label: value,
    // })
    trigger(phoneRegister.name)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    emailRegister.onChange({
      target: {
        name: emailRegister.name,
        value,
      },
    })
    // setOrderDetailsValues({
    //   ...inputs,
    //   isValid,
    //   email_label: value,
    // })
    trigger(emailRegister.name)
  }

  const handleMessageChange = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim()
    messageRegister.onChange({
      target: {
        name: messageRegister.name,
        value,
      },
    })

    // setOrderDetailsValues({
    //   ...inputs,
    //   isValid,
    //   message_label: value,
    // })
    setMessageLength(e.target.value.length)
    trigger(messageRegister.name)
  }

  useEffect(() => {
    const textarea = document.querySelector(
      `.${styles.order__list__item__details__form__textarea}`
    )

    if (textarea) {
      autosize(textarea)
    }
  }, [])


  return (
    <form className={styles.order__list__item__details__form}>
      <div className={styles.order__list__item__details__form__inner}>
      
      <label className={styles.order__list__item__details__form__label}>
          <input
            type='text'
            name={nameRegister.name}
            ref={nameRegister.ref}
            className={styles.order__list__item__details__form__input}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handleNameChange}
          />
          <span
            className={styles.order__list__item__details__form__floating_label}
          >
            Имя
          </span>
          <NameErrorMessage
            errors={errors as Partial<FieldErrorsImpl<IInputs>>}
            className={styles.order__list__item__details__form__error}
            fieldName={nameRegister.name}
          />
      </label>

      <label className={styles.order__list__item__details__form__label}>
          <input
            type='text'
            name={surnameRegister.name}
            ref={surnameRegister.ref}
            className={styles.order__list__item__details__form__input}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handleSurnameChange}
          />
          <span
            className={styles.order__list__item__details__form__floating_label}
          >
            Фамилия
          </span>
          <NameErrorMessage
            errors={errors as Partial<FieldErrorsImpl<IInputs>>}
            className={styles.order__list__item__details__form__error}
            fieldName={surnameRegister.name}
          />
      </label>

      <label className={styles.order__list__item__details__form__label}>
          <input
            type='text'
            name={phoneRegister.name}
            ref={phoneRegister.ref}
            className={styles.order__list__item__details__form__input}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handlePhoneChange}
          />
          <span
            className={styles.order__list__item__details__form__floating_label}
          >
            Номер телефона
          </span>
          {errors.phone_label && (
            <span className={styles.order__list__item__details__form__error}>
              {errors.phone_label?.message as React.ReactNode}
            </span>
          )}
      </label>

      <label className={styles.order__list__item__details__form__label}>
          <input
            type='text'
            name={emailRegister.name}
            ref={emailRegister.ref}
            className={styles.order__list__item__details__form__input}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handleEmailChange}
          />
          <span
            className={styles.order__list__item__details__form__floating_label}
          >
            E-mail
          </span>
          {errors.email_label && (
            <span className={styles.order__list__item__details__form__error}>
              {errors.email_label?.message as React.ReactNode}
            </span>
          )}
      </label>

      </div>

      <label className={styles.order__list__item__details__form__label}>
        <textarea 
          className={styles.order__list__item__details__form__textarea}
          name={messageRegister.name}
          ref={messageRegister.ref}
          onFocus={handleDetailsInputFocus}
          onBlur={handleDetailsInputBlur}
          onChange={handleMessageChange}
        />
        <span
            className={styles.order__list__item__details__form__floating_label}
          >
            Комментарий к заказу
          </span>
          {errors.message_label && errors.message_label?.type === 'maxLength' && (
          <span className={styles.order__list__item__details__form__error}>
            Не более 255 символов
          </span>
        )}
          <span
          className={styles.order__list__item__details__form__label__count}
          style={{
            color:
              messageLength > 255 ? '#242425' : 'rgba(255, 255, 255, 0.40)',
          }}
        >
          {messageLength}/255
        </span>
      </label>

    </form>
  );
};

export default OrderDetalisForm;