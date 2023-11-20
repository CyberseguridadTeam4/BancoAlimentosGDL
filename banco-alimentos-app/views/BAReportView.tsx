import { View, StyleSheet, Switch } from "react-native";
import BAText, { TypeText } from "../components/BAText";
import React, { useState } from "react";
import BAPallete from "../resources/BAPallete";
import BAButton, { ButtonState } from "../components/BAButton";
import { useModal } from "../components/Modal/BAModalContext";
import axios from "../axios";

type ReportProps = {
  closeSheet: any;
  type: any;
  objId: any;
};

export default function BAReportView({ closeSheet, type, objId }: ReportProps) {
  const [selectedReason, setSelectedReason] = useState(null);

  const reason = [
    "No me gusta",
    "Abuso y acoso",
    "Discurso violento",
    "Spam",
    "Estafa o fraude",
    "Información Falsa",
  ];

  const handleSwitch = (reason: any) => {
    if (selectedReason === reason) {
      setSelectedReason(null);
    } else {
      setSelectedReason(reason);
    }
  };
  const { openModal } = useModal();

  const text = type == 1 ? "este comentario" : "esta publicación";

  return (
    <View style={styles.body}>
      <BAText type={TypeText.label1}>
        ¿Por qué razón quieres reportar {text}?
      </BAText>
      <BAText type={TypeText.label3}>Tu reporte es anónimo.</BAText>
      <View style={styles.container}>
        {reason.map((reason) => (
          <View key={reason} style={styles.item}>
            <Switch
              trackColor={{ true: BAPallete.Red01 }}
              thumbColor={
                selectedReason === reason ? BAPallete.White : BAPallete.SoftRed
              }
              onValueChange={() => handleSwitch(reason)}
              value={selectedReason === reason}
            />
            <BAText style={{ paddingLeft: 20 }}>{reason}</BAText>
          </View>
        ))}
      </View>
      <BAButton
        onPress={() => {
          openModal(
            <ConfirmReportModal
              reason={selectedReason}
              closeSheet={closeSheet}
              type={type}
              objId={objId}
            />,
            "Confirmar reporte"
          );
        }}
        state={ButtonState.alert}
        text="Enviar reporte"
      />
    </View>
  );
}

const ConfirmReportModal = ({ reason, closeSheet, type, objId }: any) => {
  const { closeModal } = useModal();

  const sentReport = async () => {
    await axios
      .patch(`/report/${objId}/${type}`, {
        cause: reason,
      })
      .then((res) => {
        closeModal();
        closeSheet();
      });
  };

  if (reason == null) {
    return (
      <View>
        <BAText>
          Debes seleccionar una razón por la cual realizas el reporte
        </BAText>
      </View>
    );
  } else {
    return (
      <View>
        <BAText style={{ marginBottom: 20 }}>¡Gracias!</BAText>
        <BAText type={TypeText.label3} style={{ marginBottom: 20 }}>
          Tu reporte nos ayuda a mantener la comunidad segura.
        </BAText>
        <BAButton
          onPress={() => {
            sentReport();
          }}
          state={ButtonState.alert}
          text="Aceptar"
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: "flex-start",
    gap: 40,
    marginTop: 10,
  },
  container: {
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: 10,
  },
});
