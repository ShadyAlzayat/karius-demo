import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './SequenceModal.css';
import { useDispatch } from 'react-redux';
import { addSequence, editSequence } from '../../../redux/sequences/actions';
import { closeCircleOutline, save } from 'ionicons/icons';

interface ContainerProps {
  setShowModal: any;
  setEditState: any;
  editState: any;
}

const SequenceModal: React.FC<ContainerProps> = ({
  setShowModal,
  setEditState,
  editState,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    editState?.date && setDraftSequence(editState);
  }, []);
  const [draftSequence, setDraftSequence] = useState({
    sequence: String(),
    pathogen: String(),
    symptoms: String(),
    viralFactor: String(),
  });
  const { sequence, pathogen, symptoms, viralFactor } = draftSequence;
  const addDraftSequence = () => {
    dispatch(addSequence(draftSequence));
    setShowModal(false);
  };
  const editDraftSequence = () => {
    dispatch(editSequence(draftSequence));
    setShowModal(false);
  };
  const handleChosenFile = (file: any) => {
    const handleFileRead = () => {
      const content: any = fileReader.result;
      const lines = content.split('\n');
      const parsedObject = {
        sequence: String(),
        pathogen: String(),
        symptoms: String(),
        viralFactor: String(),
      };
      lines.map((line: String) => {
        if (line.substr(0, line.lastIndexOf(' ')).includes('sequence')) {
          parsedObject.sequence = line.substr(line.lastIndexOf(' ') + 1);
        } else if (line.substr(0, line.lastIndexOf(' ')).includes('pathogen')) {
          parsedObject.pathogen = line.substr(line.lastIndexOf(' ') + 1);
        } else if (line.substr(0, line.lastIndexOf(' ')).includes('symptoms')) {
          parsedObject.symptoms = line.substr(line.lastIndexOf(' ') + 1);
        } else if (
          line.substr(0, line.lastIndexOf(' ')).includes('viral factor')
        ) {
          parsedObject.viralFactor = line.substr(line.lastIndexOf(' ') + 1);
        }
      });
      setDraftSequence({ ...parsedObject });
    };
    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };
  return (
    <IonContent>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              {editState?.date ? 'Edit Sequence' : 'Add Sequence'}
            </IonTitle>
            <IonFab vertical='top' horizontal='end'>
              <IonButton
                color='white'
                icon-only
                onClick={() => {
                  setShowModal(false);
                  setEditState({});
                }}
              >
                <IonIcon icon={closeCircleOutline} />
              </IonButton>
            </IonFab>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {!editState?.date && (
              <IonItem>
                <IonRow>
                  <IonLabel position='fixed'>Text File</IonLabel>
                </IonRow>
                <IonRow>
                  <input
                    type='file'
                    id='file'
                    accept='.txt'
                    onChange={(e: any) => {
                      handleChosenFile(e.target.files[0]);
                    }}
                  ></input>
                </IonRow>
              </IonItem>
            )}
            <IonItem>
              <IonLabel position='floating'>
                Sequence <a>*</a>
              </IonLabel>
              <IonInput
                value={sequence}
                onIonChange={(e) =>
                  setDraftSequence({
                    ...draftSequence,
                    sequence: e.detail.value!.toUpperCase(),
                  })
                }
              ></IonInput>
            </IonItem>
            <IonItemDivider />

            <IonItem>
              <IonLabel position='floating'>
                Pathogen <a>*</a>
              </IonLabel>
              <IonInput value={pathogen}></IonInput>
            </IonItem>
            <IonItemDivider />

            <IonItem>
              <IonLabel position='floating'>
                Symptoms <a>*</a>
              </IonLabel>
              <IonInput value={symptoms}></IonInput>
            </IonItem>
            <IonItemDivider />

            <IonItem>
              <IonLabel position='floating'>
                Viral Factor <a>*</a>
              </IonLabel>
              <IonInput value={viralFactor}></IonInput>
            </IonItem>
            <IonItemDivider />
          </IonList>
        </IonContent>
        <IonButton
          onClick={editState?.date ? editDraftSequence : addDraftSequence}
          disabled={!sequence.length}
        >
          {editState?.date ? 'Save' : 'Add'}
        </IonButton>
      </IonPage>
    </IonContent>
  );
};

export default SequenceModal;
