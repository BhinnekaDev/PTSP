import { useState } from "react";
import { useRouter } from "next/navigation";
import useServiceItemsPagination from "@/hooks/Frontend/useStepperFormIKM";
import useMasukanIKM from "@/hooks/Backend/useMasukanIKM";
import { Button } from "@material-tailwind/react";

const ProgressBar = ({ progressWidth }) => (
  <div className="flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-primary font-sans text-xs font-medium">
    <div
      className="flex h-full items-center justify-center overflow-hidden break-all rounded-full bg-secondary"
      style={{ width: `${progressWidth}%` }}
    ></div>
  </div>
);

const ServiceItemCard = ({
  item,
  index,
  renderRadioGroup,
  renderImportanceGroup,
}) => (
  <div
    key={index}
    className="bg-white p-4 rounded-lg shadow-md border-2 border-gray"
  >
    <h3 className="font-medium text-lg mb-2">{item.name}</h3>
    <div>
      <p className="font-semibold mb-1">Kualitas Pelayanan</p>
      {renderRadioGroup(item.id)}
    </div>
    <div className="mt-3">
      <p className="font-semibold mb-1">Harapan Konsumen</p>
      {renderImportanceGroup(item.id)}
    </div>
  </div>
);

const PaginationControls = ({
  handlePrevious,
  handleNext,
  disablePrevious,
  disableNext,
}) => (
  <div className="flex justify-between mt-8">
    <button
      onClick={handlePrevious}
      disabled={disablePrevious}
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
        disablePrevious ? "hidden" : ""
      }`}
    >
      Sebelumnya
    </button>
    <button
      onClick={handleNext}
      disabled={disableNext}
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
        disableNext ? "hidden" : ""
      }`}
    >
      Selanjutnya
    </button>
  </div>
);

const FormIKMKedua = ({ pemesanan }) => {
  const {
    serviceItems,
    currentItems,
    currentStep,
    handleNext,
    handlePrevious,
    startIndex,
    endIndex,
    itemsPerPage,
  } = useServiceItemsPagination();

  const {
    renderKualitasLayananGroup,
    renderHarapanKonsumenGroup,
    handleIKMSubmit,
  } = useMasukanIKM();

  const totalPages = Math.ceil(serviceItems.length / itemsPerPage);
  const progressWidth = ((currentStep + 1) / totalPages) * 100;
  const pengarah = useRouter();
  const handleSubmitIKM = () => {
    if (!pemesanan?.id) {
      toast.error("Data pemesanan tidak ditemukan.");
      return;
    }
    handleIKMSubmit(pemesanan.id);
  };
  return (
    <>
      <ProgressBar progressWidth={progressWidth} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {currentItems.map((item, index) => (
          <ServiceItemCard
            key={item.id}
            item={item}
            index={index}
            startIndex={startIndex}
            renderRadioGroup={renderKualitasLayananGroup}
            renderImportanceGroup={renderHarapanKonsumenGroup}
          />
        ))}
      </div>
      <PaginationControls
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        disablePrevious={currentStep === 0}
        disableNext={endIndex >= serviceItems.length}
      />
      {endIndex >= serviceItems.length && (
        <div className="flex justify-end">
          <Button
            onClick={() => handleSubmitIKM()}
            className="px-4 py-2 mt-6 bg-green-500 text-white rounded-lg button-effect"
          >
            Simpan IKM
          </Button>
        </div>
      )}
    </>
  );
};

export default FormIKMKedua;
