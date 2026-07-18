import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import TaskForm from "./TaskForm";

const TaskModal = ({ open, onClose, task, onSuccess }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
          fixed
          inset-0
          z-50
          bg-black/50
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-4
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
            relative
            w-full
            max-w-2xl
            max-h-[90vh]
            overflow-y-auto
            rounded-3xl
            bg-white
            shadow-2xl
            p-6
            sm:p-8
            "
          >
            {/* Close Button */}

            <button
              onClick={onClose}
              className="
              absolute
              top-5
              right-5
              h-10
              w-10
              rounded-full
              border
              flex
              items-center
              justify-center
              hover:bg-gray-100
              transition
              "
            >
              <X size={18} />
            </button>

            <TaskForm task={task} onClose={onClose} onSuccess={onSuccess} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
