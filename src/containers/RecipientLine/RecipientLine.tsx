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
  const isDeliveryLink = isLinkKey(field) ? field : '';

  return (
    <div>
      <div className="line-head">
        {!isDeliveryLink &&
          `${TITLES[field]}:`
        }

        {isDeliveryLink && (
          <a
            className={isDeliveryLink}
            href={LINKS[field]}
            title={`Перейти на сайт ${TITLES[field]}`}
            target='_blank'>
              {TITLES[field].toLocaleUpperCase()}:
          </a>
        )}
      </div>
            
      {!isDeliveryLink && (
        <div>{value}</div>
      )}

      {isDeliveryLink && (
        <CopyToClipboard
          value={value}
          successMessage={`Адрес ${TITLES[field].toLocaleUpperCase()} скопирован`}
        >
          📑 {value}
        </CopyToClipboard>
      )}
    </div>
  )
}

export default RecipientLine;