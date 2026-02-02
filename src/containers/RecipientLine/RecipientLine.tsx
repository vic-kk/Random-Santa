import { CopyToClipboard } from '../../containers';
import './RecipientLine.css'

type LineType = 'gender' | 'wishes' | 'wb' | 'ozon';

interface RecipientLineProps {
  value: string;
  lineType: LineType;
}

const TITLES:{
  [value in LineType] : string;
} = {
  gender: 'Твой получатель',
  wishes: 'Пожелания',
  ozon: 'ozon',
  wb: 'wb',
}

const RecipientLine = ({ value, lineType }: RecipientLineProps) => {
  const defineSpecialStyles = (lineType === TITLES.wb || lineType === TITLES.ozon) ? lineType : '';

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