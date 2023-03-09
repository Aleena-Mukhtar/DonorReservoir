import React, { useState } from 'react';
import RegistrationPage from './RegistrationPage';
import TermsPage from './TermsPage';
import ThanksPage from './ThanksPage';
export const requestContext = React.createContext();

export default function DonorContainer() {
    const [tab, setTab] = useState(0);
    const DonorValue = {
        tab,
        setTab,
    };
    const DonorContent = (tab) => {
        switch (tab) {
            case 0:
                return <TermsPage />;
            case 1:
                return <RegistrationPage />;
            case 2:
                return <ThanksPage />;
          default:
        }
    };
  return (
    <div className='donorContainer'>
        <requestContext.Provider value={DonorValue}>
            {DonorContent(tab)}
        </requestContext.Provider>
    </div>
  )
}
