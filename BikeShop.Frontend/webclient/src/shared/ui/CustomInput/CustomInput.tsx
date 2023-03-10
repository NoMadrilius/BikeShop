import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, ReactNode,} from 'react'
import s from './CustomInput.module.scss'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

// здесь мы говорим, что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтобы не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
}

export const CustomInput: React.FC<SuperInputTextPropsType> = (
    {
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        className,
        spanClassName,
        id,

        ...restProps // все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    // const finalSpanClassName = s.error
    //     + (spanClassName ? ' ' + spanClassName : '')
    // const finalInputClassName = s.input
    //     + (error ? ' ' + s.errorInput : ' ' + s.superInput)
    //     + (className ? ' ' + s.className : '') // смешивание классов
    const finalSpanClassName = `${error ? s.error : ''} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${error ? s.errorInput : ''} ${className ? className : s.superInput}`

    return (
        <div className={s.inputWrapper}>
            <input
                id={id}
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <div className={s.errorWrapper}>
                {error && <span className={finalSpanClassName}>{error}</span>}
            </div>
            {/*вариант строки с id*/}
            {/*<span*/}
            {/*    id={id ? id + '-span' : undefined}*/}
            {/*    className={finalSpanClassName}*/}
            {/*>*/}
            {/*    {error}*/}
            {/*</span>*/}

            {/*иконки-кнопки*/}
            {/*<div>*/}
            {/*    <SuperButton*/}
            {/*        type={'submit'}*/}
            {/*        className={styles.findButton}>*/}
            {/*        Найти*/}
            {/*    </SuperButton>*/}
            {/*</div>*/}
            {/*<div className={styles.clearInput} onClick={clearSearchHandler}>*/}
            {/*    X*/}
            {/*</div>*/}
        </div>
    )
}