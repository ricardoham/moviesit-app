import React from 'react';
import {
  Page, Text, View, Document, StyleSheet,
} from '@react-pdf/renderer';
import { GenPdf } from 'model/genPdf';
import { localDate } from 'utils/localDate';

interface Props {
  type?: 'recommendation' | 'waitlist';
  data?: GenPdf[];
  section?: string;
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    margin: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemOverview: {
    marginTop: 8,
    fontSize: 12,
  },
});
const today = new Date();

const GeneratorPdf = ({ type, data, section }: Props):JSX.Element => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.sectionTitle}>
          {section}
        </Text>
      </View>
      {
          data?.map((item) => (
            <View key={item.id} style={styles.sectionContent}>
              <Text style={styles.itemTitle}>{item?.itemTitle}</Text>
              {
                type === 'recommendation'
                  ? (
                    <>
                      <Text style={styles.itemSubTitle}>Descrição: </Text>
                      <Text style={styles.itemOverview}>{item?.overview}</Text>
                      <Text style={styles.itemSubTitle}>Filmes: </Text>
                      {
                        item.movies?.map((m) => (
                          <Text key={m.movieId} style={styles.itemOverview}>{m.title}</Text>
                        ))
                      }
                    </>
                  )
                  : <Text style={styles.itemOverview}>{item?.overview}</Text>
              }
              {
                type === 'waitlist'
                && (
                  <>
                    <Text style={styles.itemSubTitle}>Data para assistir: </Text>
                    <Text style={styles.itemOverview}>
                      {
                        localDate(item?.dueDate)
                      }
                    </Text>
                  </>
                )
              }
              <Text style={styles.itemSubTitle}>Data de criação: </Text>
              <Text style={styles.itemOverview}>
                {
                  localDate(item?.createdAt)
                }
              </Text>
            </View>
          ))
        }
    </Page>
  </Document>
);

export default GeneratorPdf;
