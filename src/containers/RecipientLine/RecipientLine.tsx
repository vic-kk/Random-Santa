import { CopyToClipboard } from '../../containers';
import { DeliveryData, DeliveryDataKeys } from '../../data';
import './RecipientLine.css'

interface RecipientLineProps {
  field: DeliveryDataKeys;
  value: string;
}

type Links = Partial<Record<DeliveryDataKeys, string>>

const TITLES: DeliveryData = {
  gender: 'Твой получатель',
  wishes: 'Пожелания',
  ozon_address: 'ozon',
  wb_address: 'wb',
}

const LINKS: Links = {
  ozon_address: 'https://www.ozon.ru/',
  wb_address: 'https://www.wildberries.ru/',
}

function isLinkKey(key: keyof DeliveryData): key is keyof Links {
  return key in LINKS;
}

const RecipientLine = ({ value, field }: RecipientLineProps) => {
  const defineSpecialStyles = isLinkKey(field) ? field : '';

  return (
    <div>
      <div className="line-head">
        {defineSpecialStyles ? (
          <a
            className={defineSpecialStyles}
            href={LINKS[field]}
            title={`Перейти на сайт ${TITLES[field]}`}
            target='_blank'>
              {TITLES[field].toLocaleUpperCase()}:
          </a>
        ) : (
          `${TITLES[field]}:`
        )}
      </div>
      
      
      {!defineSpecialStyles && (
        <div>{value}</div>
      )}

      {defineSpecialStyles && (
        <CopyToClipboard
          value={value}
          successMessage={`Адрес ${TITLES[field].toLocaleUpperCase()} скопирован`}
        >
          {value}
        </CopyToClipboard>
      )}
    </div>
  )
}

export default RecipientLine;