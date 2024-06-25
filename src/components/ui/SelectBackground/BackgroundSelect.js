import * as React from 'react';
import { useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import styles from '../../../app/styles/ThemeIcon.module.css';
import { RadioItem } from '@radix-ui/react-menubar';

 const BackgroundSelect = () => {
    const [selectedValue, setSelectedValue] = useState('default');
    return (
        <RadioGroup.Root
            value={selectedValue}
            onValueChange={(value) => setSelectedValue(value)}
            style={{'border': '1px solid #000'}}
            className={styles.radio_group}
        >
           <RadioItem value="default"></RadioItem>
           <RadioItem value="gradient"></RadioItem>
           <RadioItem value="lofi"></RadioItem>
           <RadioItem value="ditoo"></RadioItem>
        </RadioGroup.Root>
    );
};

export default BackgroundSelect;