import {FaX} from 'react-icons/fa6';
import useConversation from '../../zustand/useConversation';
import DeleteMessage from './DeleteMessage';
import EditMessage from './EditMessage';

const MessageOptions = () => {
  const {setSelectedMessage} = useConversation();

  return (
    <div className="bg-slate-200 rounded-xl p-2 z-50 flex gap-2">
      <DeleteMessage />
      <EditMessage />
      <div
        className="cursor-pointer w-5 h-5"
        onClick={() => setSelectedMessage(null)}
      >
        <FaX className="w-full h-full" />
      </div>
    </div>
  );
};

export default MessageOptions;
