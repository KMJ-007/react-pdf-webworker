import { Document, Page, Text, Font, View } from '@react-pdf/renderer';
import { format, getTime, formatDistanceToNow,isValid, addDays } from 'date-fns';
import { FC } from 'react';
import { pdfStyles } from './pdfstyles';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

export type PDFProps = { data: any };

export const PDF: FC<PDFProps> = ({ data }) => {
  function fddmmyy(date: any) {
    // console.log({date});
    return date && isValid(new Date(date)||date) ? format(new Date(date), 'dd-MM-yy') : "";
  }
  console.log(data);
  return (
    <Document>
      <Page size="A4" orientation="portrait" style={pdfStyles.page}>
        <View
          style={{
            ...pdfStyles.topBorder,
            backgroundColor: "#f2f4f7",
            flexDirection: "row",
            fontSize: 12,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          <Text style={{ width: '13%' }}>S.Inv.No.</Text>
          <Text style={{ ...pdfStyles.leftLightBorder, width: '13%' }}>Inv.Dt.</Text>
          <Text style={{ ...pdfStyles.leftLightBorder, width: '13%' }}>Pcs</Text>
          <Text style={{ ...pdfStyles.leftLightBorder, width: '19%' }}>Inv.Amt.</Text>
          <Text style={{ ...pdfStyles.leftLightBorder, width: '18%' }}>Transport</Text>
          <Text style={{ ...pdfStyles.leftLightBorder, width: '13%' }}>LR.No.</Text>
          <Text style={{ ...pdfStyles.leftLightBorder, width: '13%' }}>LR.Date</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: 2,
            justifyContent: 'space-between',
          }}
        >
          {data.map((invoiceData: any, index: number) => (
            <View
              key={index}
              style={{
                ...pdfStyles.topBorder,
                backgroundColor: "#f2f4f7",
                flexDirection: "row",
                fontSize: 12,
                justifyContent: 'space-between',
                textAlign: 'center',
              }}
            >
              <Text style={{ width: '13%' }}>{invoiceData.sInvNo}</Text>
              <Text style={{ ...pdfStyles.leftLightBorder, width: '13%' }}>{fddmmyy(invoiceData.invoiceDate)}</Text>
              <Text style={{ ...pdfStyles.leftLightBorder, width: '13%' }}>{invoiceData.pcs}</Text>
              <Text style={{ ...pdfStyles.leftLightBorder, width: '19%' }}>{invoiceData.invAmount}</Text>
              <Text style={{ ...pdfStyles.leftLightBorder, width: '18%' }}>{invoiceData.transport}</Text>
              <Text style={{ ...pdfStyles.leftLightBorder, width: '13%' }}>{invoiceData.lrNo}</Text>
              <Text style={{ ...pdfStyles.leftLightBorder, width: '13%' }}>{fddmmyy(invoiceData.lrDate)}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
