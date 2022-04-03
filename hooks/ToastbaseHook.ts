import {UseToastOptions} from '@chakra-ui/toast/src/use-toast';
import {useToast} from '@chakra-ui/react';

export function useBaseToast(options?: UseToastOptions) {
    const baseOptions: UseToastOptions = {
        duration: 5000,
        isClosable: true,
        position:'bottom'
    };
    if (options) {
        options = {...baseOptions, ...options};
    } else {
        options = baseOptions;
    }
    return useToast(options);
}
