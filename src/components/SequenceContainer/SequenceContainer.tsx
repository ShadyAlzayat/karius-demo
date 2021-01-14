import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonRow,
  IonSearchbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './SequencesContainer.css';
import { useSelector, useDispatch } from 'react-redux';
import { getSequences } from '../../redux/sequences/actions';
import moment from 'moment';
import { add, arrowForwardCircle, pulseOutline } from 'ionicons/icons';
import SequenceModal from '../modals/SequenceModal/SequenceModal';

interface ContainerProps {
  name: string;
}

const SequencesContainer: React.FC<ContainerProps> = ({ name }) => {
  const sequences = useSelector((state: any) => state?.sequences);
  const [showModal, setShowModal] = useState(Boolean());
  const [editState, setEditState] = useState({
    sequence: String(),
    pathogen: String(),
    symptoms: String(),
    viralFactor: String(),
  });
  const [searchValue, setSearchValue] = useState(String());
  const [searchResults, setSearchResults] = useState(Array());

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSequences());
  }, []);
  useEffect(() => {
    setSearchResults(sequences);

    return () => {};
  }, [sequences]);
  useEffect(() => {
    if (!searchValue.length) {
      setSearchResults(sequences);
    } else if (sequences) {
      const results = sequences.filter((item: any) => {
        if (
          item?.sequence &&
          item?.sequence?.toLowerCase().includes(searchValue) === true
        )
          return item?.sequence?.toLowerCase().includes(searchValue);
        if (
          item?.pathogen &&
          item?.pathogen?.toLowerCase().includes(searchValue) === true
        )
          return item?.pathogen?.toLowerCase().includes(searchValue);
        if (
          item?.symptoms &&
          item?.symptoms?.toLowerCase().includes(searchValue) === true
        )
          return item?.symptoms?.toLowerCase().includes(searchValue);
        if (
          item?.viralFactor &&
          item?.viralFactor?.toLowerCase().includes(searchValue) === true
        )
          return item?.viralFactor?.toLowerCase().includes(searchValue);
      });
      setSearchResults(results);
    }
    return () => {};
  }, [searchValue]);
  const showEditModal = (item: any) => {
    setEditState(item);
    setShowModal(true);
  };
  const renderItem = (item: any) => {
    const { date, sequence, pathogen, symptoms, viralFactor } = item;
    return (
      <IonItem key={item.id} onClick={() => showEditModal(item)}>
        <IonGrid>
          <IonRow>
            <IonCol size='3'>
              <IonLabel>{sequence}</IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel>{pathogen}</IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel>{moment.parseZone(date).format('L')}</IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel>{symptoms}</IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel>{viralFactor}</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    );
  };
  const SequenceList = (props: any) => {
    const { data } = props;
    return (
      <IonList class='ion-padding-top'>
        <IonListHeader lines='inset'>
          <IonGrid>
            <IonRow>
              <IonCol size='3'>
                <IonLabel>Sequence</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel>Pathogen</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel>Date</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel>Symptoms</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel>Viral Factor</IonLabel>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonListHeader>
        {data.map((item: any) => {
          return renderItem(item);
        })}
      </IonList>
    );
  };
  return (
    <IonContent>
      <IonSearchbar
        value={searchValue}
        onIonChange={(e: any) => {
          setSearchValue(e.detail.value);
        }}
        debounce={50}
        placeholder='search sequences'
        showCancelButton='focus'
      />
      <IonFab vertical='top' horizontal='end' slot='fixed'>
        <IonFabButton onClick={() => setShowModal(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      <SequenceList data={searchResults} />
      <IonModal
        backdropDismiss={false}
        isOpen={showModal}
        cssClass='my-custom-class'
      >
        <SequenceModal
          setShowModal={setShowModal}
          setEditState={setEditState}
          editState={editState}
        />
      </IonModal>
    </IonContent>
  );
};

export default SequencesContainer;
