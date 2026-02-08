import { FEATURES } from './features';
import { DeliveryData, DeliveryDataKeys, DeliveryDataValue, DELIVERY_DATA } from './data';
import { GoogleForm, Header, InService, Recipient, RecipientLine } from './containers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

type TargetUserData = DeliveryData | undefined;

type TargetEntries = [DeliveryDataKeys, DeliveryDataValue];

const URLS = {
  tgAdmin: 'https://t.me/+omk7AIuSRmZmMjMy7',
  googleForm: 'https://forms.gle/ichPY3Vzn1FY5fUL9',
};

const LS_KEY = 'SANTAUniqId';

const GenerateRandomSixDigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

function App() {
  if (!localStorage.getItem(LS_KEY)) {
    const randomNumber = GenerateRandomSixDigitNumber();
    localStorage.setItem(LS_KEY, `${randomNumber}`);
  }

  const number = parseInt((localStorage?.getItem(LS_KEY) as string), 10);

  const target: TargetUserData = DELIVERY_DATA?.get(number);

  return (
    <>
      <Header number={number} adminUrl={URLS.tgAdmin} />

      {FEATURES.IN_SERVICE && (
        <InService />
      )}

      {!FEATURES.IN_SERVICE && (
        <>
          {!FEATURES.SANTA_READY && (
            <GoogleForm url={URLS.googleForm} />
          )} 

          {FEATURES.SANTA_READY && (
            <Recipient target={target}>
              {target && 
                (Object.entries(target) as TargetEntries[]).map(([key, value]) => (
                  <RecipientLine
                    field={key}
                    value={value}
                  />
                ))
              }
            </Recipient>
          )}
        </>
      )}

      <ToastContainer />
    </>
  )
}

export default App
