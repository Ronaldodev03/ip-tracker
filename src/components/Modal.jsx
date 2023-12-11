/* eslint-disable react/prop-types */
const Modal = ({ open, children }) => {
  return (
    /* backdrop */
    <div
      className={` fixed inset-0 z-[1000] flex justify-center items-center transition-colors ${
        open ? "visible bg-black/50" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        className={`bg-white transition-all rounded-[0.9385rem] shadow-custom min-w-80 min-h-40 py-6 px-8 ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
