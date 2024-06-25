
import  React from "react";
import Radio from "@mui/material/Radio";
import * as RadioGroup from "@radix-ui/react-radio-group";
import cn from 'clsx';;
import s from '../../../app/styles/RadioItem.module.css';

 const RadioItem = (props) => {
    const {
        value,
        variant = 'default',
    } = props;

    const rootClassName = cn(
        s.root,
        {    
            [s.default]: variant === "default",
            [s.dark]: variant === 'dark',
            [s.white]: variant === 'white',
            [s.violet]: variant === 'violet',
            [s.pastelP]: variant === "pastel-pink",
            [s.pastelB]: variant === "pastel-blue",
        },
    );


    return (
        <RadioGroup.Item value={value} className={rootClassName}>
            <RadioGroup.Indicator className="absolute">
                {/* CheckIcon */}
            </RadioGroup.Indicator>
            {value}
        </RadioGroup.Item>
    );
}

export default RadioItem;