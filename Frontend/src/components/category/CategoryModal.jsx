import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import CategoryForm from "./CategoryForm";

const CategoryModal = ({ open, onClose, category, onSuccess }) => {
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
              y: 30,
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
            max-w-lg
            rounded-3xl
            bg-white
            shadow-2xl
            p-6
            sm:p-8
            "
          >
            <button
              onClick={onClose}
              className="
              absolute
              top-5
              right-5
              w-10
              h-10
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

            <CategoryForm
              category={category}
              onClose={onClose}
              onSuccess={onSuccess}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal;
