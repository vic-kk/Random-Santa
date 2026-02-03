import { CopyToClipboard } from '../../containers';
import './RecipientLine.css'

type LineType = 'gender' | 'wishes' | 'ozon_address' | 'wb_address';

interface RecipientLineProps {
  value: string;
  lineType: LineType;
}

const TITLES:{
  [value in LineType] : string;
} = {
  gender: 'Твой получатель',
  wishes: 'Пожелания',
  ozon_address: 'ozon',
  wb_address: 'wb',
}

const RecipientLine = ({ value, lineType }: RecipientLineProps) => {
  const defineSpecialStyles = (TITLES[lineType] === TITLES.ozon_address || TITLES[lineType] === TITLES.wb_address) ? lineType : '';

  return (
    <div>
      <div className={`line-head ${defineSpecialStyles}`}>
        {defineSpecialStyles ? TITLES[lineType].toLocaleUpperCase() : TITLES[lineType]}:
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