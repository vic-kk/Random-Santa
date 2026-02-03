import { CopyToClipboard } from '../../containers';
import './RecipientLine.css'

type LineType = 'gender' | 'wishes' | 'ozon_address' | 'wb_address';

interface RecipientLineProps {
  value: string;
  lineType: LineType;
}

const TITLES: Record<LineType, string> = {
  gender: 'Твой получатель',
  wishes: 'Пожелания',
  ozon_address: 'ozon',
  wb_address: 'wb',
}

const LINKS: Partial<Record<LineType, string>> = {
  ozon_address: 'https://www.ozon.ru/',
  wb_address: 'https://www.wildberries.ru/',
}

const RecipientLine = ({ value, lineType }: RecipientLineProps) => {
  const defineSpecialStyles = LINKS[lineType] ? lineType : '';

  return (
    <div>
      <div className="line-head">
        {defineSpecialStyles ? (
          <a
            className={defineSpecialStyles}
            href={LINKS[lineType]}
            title={`Перейти на сайт ${TITLES[lineType]}`}
            target='_blank'>
              {TITLES[lineType].toLocaleUpperCase()}:
          </a>
        ) : (
          `${TITLES[lineType]}:`
        )}
      </div>
      
      
      {!defineSpecialStyles && (
        <div>{value}</div>
      )}

      {defineSpecialStyles && (
        <CopyToClipboard
          value={value}
          successMessage={`Адрес ${TITLES[lineType].toLocaleUpperCase()} скопирован`}
        >
          {value}
        </CopyToClipboard>
      )}
    </div>
  )
}

export default RecipientLine;