import { Modal, Portal, Text } from 'react-native-paper';

type TimerEditModalProps = {
  visible: boolean;
};

const TimerEditModal = ({ visible }: TimerEditModalProps) => {
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => console.log('dismiss')}
        contentContainerStyle={containerStyle}
      >
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </Portal>
  );
};

export default TimerEditModal;
