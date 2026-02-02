import { FEATURES } from './features';
import { Address, ADDRESSES } from './data';
import { GoogleForm, Header, InService, Recipient, RecipientLine } from './containers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

type targetData = Address | undefined;

const URLS = {
  tgAdmin: 'https://t.me/+omk7AIuSRmZmMjMy7',
  googleForm: 'https://forms.gle/ichPY3Vzn1FY5fUL9',
};

const LSData = 'SANTAUniqId';

const GenerateRandomSixDigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

function App() {
  if (!localStorage.getItem(LSData)) {
    const randomNumber = GenerateRandomSixDigitNumber();
    localStorage.setItem(LSData, `${randomNumber}`);
  }

  const number = parseInt((localStorage?.getItem(LSData) as string), 10);

  const target: targetData = ADDRESSES?.get(+number);

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

          {FEATURES.SANTA_READY &&  (
            <Recipient target={target}>
              {target && (<>
                <RecipientLine
                  lineType='gender'
                  value={target.gender}
                />
                <RecipientLine
                  lineType='wishes'
                  value={target.wishes}
                />
                <RecipientLine
                  lineType='ozon'
                  value={target.ozon_address}
                />
                <RecipientLine
                  lineType='wb'
                  value={target.wb_address}
                />
              </>)}
            </Recipient>
          )}
        </>
      )}

      <ToastContainer />
    </>
  )
}

export default App
