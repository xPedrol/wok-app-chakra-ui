import {TabPanel} from '@chakra-ui/react';

const CustomTabPanel = ({children}) => {
    return (
        <>
            <TabPanel px={0}>
                {children}
            </TabPanel>
        </>
    );
};
export default CustomTabPanel;
