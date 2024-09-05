import { useGridApiRef } from '@mui/x-data-grid/hooks/utils/useGridApiRef';
import { formatNumber } from 'package/util';
import { ChangeEvent, useEffect, useState } from 'react';

export const useGetFilter = () => {
    const [text, setText] = useState('');

    const handleChangeEventText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
    const handleChangeText = (e: string) => {
        setText(e);
    };

    const findAllIndexByAnyField = (array: any[], searchString: string): number[] => {
        return array.reduce((indexes, obj, index) => {
            const match = Object.values(obj).some((value) => {
                if (typeof value === 'string') {
                    return value.includes(searchString);
                }
                if (typeof value === 'number') {
                    return formatNumber(value) === searchString;
                }
                return false;
            });

            if (match) {
                indexes.push(index);
            }

            return indexes;
        }, [] as number[]);
    };



    return { text, handleChangeEventText, handleChangeText, findAllIndexByAnyField };
};
