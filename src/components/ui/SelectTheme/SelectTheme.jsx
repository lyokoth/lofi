'use client'
import * as React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import  RadioItem  from '../RadioItem/RadioItem';
import cn from 'clsx';
import { useTheme } from 'next-themes';
import s from '../../../app/styles/theme.module.css';

function SelectTheme() {
    const { theme, setTheme } = useTheme();

    const rootClassName = cn(s.root)

    return (
        <form>
            <RadioGroup.Root
                value={theme}
                className={cn(s.root)}
                onValueChange={(e) => setTheme(e)}
                style={{'border': '2px solid #000'}}
           
            >
                <RadioItem value="default"></RadioItem>
                <RadioItem value="dark"></RadioItem>
                <RadioItem value="violet"></RadioItem>
                <RadioItem value="pastelPink"></RadioItem>
                <RadioItem value="pastelBlue"></RadioItem>
                <RadioItem value="gradient"></RadioItem>
                <RadioItem value="lofiRed"></RadioItem>
                <RadioItem value="ditoo"></RadioItem>

                            </RadioGroup.Root>
        </form>
    );
}

export default SelectTheme;