import { z } from 'zod';

import { FC, memo, useEffect, useState } from 'react';

import { Button, Grid, Stack, NumberInput } from '@mantine/core';

import { IconX } from '@tabler/icons-react';

import classes from './index.module.css';

const FilterSchema = z.object({
    priceFrom: z.number().nonnegative('Значение должно быть неотрицательным').optional(),
    priceTo: z.number().nonnegative('Значение должно быть неотрицательным').optional(),
});

interface FilterData {
    priceFrom?: number | undefined,
    priceTo?: number | undefined
}

const Filters: FC = () => {
    const [filterData, setFilterData] = useState<FilterData>({ priceFrom: undefined, priceTo: undefined });
    const [resetIsOn, setResetIsOn] = useState(false);

    const checkAndSetFilterData = (newFilterData: FilterData) => {console.log('checkAndSetFilterData start', newFilterData, resetIsOn)
        if (resetIsOn) return; console.log('checkAndSetFilterData continue')
        try {
            const newData = FilterSchema.parse(newFilterData);
            setFilterData(newData);
        } catch (err) {
            alert('Only numbers are allowed!');
        }
    };

    const handleResetAllClick = () => {
        setResetIsOn(true);
    };

    useEffect(() => { console.log('useEffect', resetIsOn)
        if (resetIsOn) {
            setFilterData({ priceFrom: undefined, priceTo: undefined });
            setResetIsOn(false);
        }
    }, [resetIsOn]);

    return (
        <Stack
            w="315px"
            h="auto"
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="md"
            p="20px"
            className={classes.stack}
        >
            <Grid align="center">
                <Grid.Col span={6} className={classes.filters_title_block}>Filters</Grid.Col>
                <Grid.Col span={6} className={classes.reset_all_block}>
                    <Button
                        rightSection={<IconX size={14} />}
                        variant="default"
                        className={classes.reset_all_btn}
                        onClick={handleResetAllClick}>
                        Reset All
                    </Button>
                </Grid.Col>
            </Grid>
            <div>
                Price
            </div>
            <Grid>
                <Grid.Col span={6}>
                    <NumberInput
                        label=""
                        leftSection="From:"
                        leftSectionWidth={50}
                        suffix="$"
                        placeholder="$"
                        hideControls
                        value={filterData.priceFrom}
                        onChange={(data) => checkAndSetFilterData({
                            priceFrom: !data ? undefined : +data,
                            priceTo: filterData.priceTo,
                        })}
                        wrapperProps={{
                            pt: 8,
                            pb: 8,
                            pl: 12,
                            pr: 12,
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <NumberInput
                        label=""
                        leftSection="To:"
                        leftSectionWidth={30}
                        suffix="$"
                        placeholder="$"
                        hideControls
                        value={filterData.priceTo}
                        onChange={(data) => checkAndSetFilterData({
                            priceFrom: filterData.priceFrom,
                            priceTo: !data ? undefined : +data,
                        })}
                    />
                </Grid.Col>
            </Grid>        
        </Stack>
    );
};

export default memo(Filters);
