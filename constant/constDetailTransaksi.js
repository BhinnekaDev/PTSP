import { useState } from "react";

function useFormStates() {
  const [bukaPerbaikanDokumen, setBukaPerbaikanDokumen] = useState(false);
  const [bukaPengisianIkm, setBukaPengisianIkm] = useState(false);
  const [bukaPengisianBuktiTransaksi, setBukaPengisianBuktiTransaksi] =
    useState(false);
  const [bukaUnduhDokumen, setBukaUnduhDokumen] = useState(false);
  const [bukaInvoicePemesanan, setBukaInvoicePemesanan] = useState(false);
  const [bukaKonfirmasiVABaru, setBukaKonfirmasiVABaru] = useState(false);

  return {
    bukaPerbaikanDokumen,
    setBukaPerbaikanDokumen,
    bukaPengisianIkm,
    setBukaPengisianIkm,
    bukaPengisianBuktiTransaksi,
    setBukaPengisianBuktiTransaksi,
    bukaUnduhDokumen,
    setBukaUnduhDokumen,
    bukaInvoicePemesanan,
    setBukaInvoicePemesanan,
    bukaKonfirmasiVABaru,
    setBukaKonfirmasiVABaru,
  };
}

export default useFormStates;
