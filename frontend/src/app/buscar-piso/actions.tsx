"use server";
interface FormDataInterface {
  provincia: string;
  ayuntamiento: string;
  calle: string;
  numero: string;
  piso: string;
  puerta: string;
}

export interface AddressInterface {
  id:number;
  provincia: string;
  ayuntamiento: string;
  calle: string;
  numero: string;
  piso: string;
  puerta: string;
  error: string;
}

export async function getAddress(formData: FormDataInterface) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/searchAddress`,
      {
        //ESTOY HACIENDO UN FETCH AL BACKEND QUE ES PRIVADO ASÍ QUE TENGO QUE HACERLO SERVER SIDE
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok){
      return {
        id: 0,
        provincia: "",
        ayuntamiento: "",
        calle: "",
        numero: "",
        piso: "",
        puerta: "",
        error: "404"
      }
    }
    const aptJson = await response.json();
    return {
      id: aptJson.id,
      provincia: aptJson.provincia,
      ayuntamiento: aptJson.ayuntamiento,
      calle: aptJson.calle,
      numero: aptJson.numero,
      piso: aptJson.piso,
      puerta: aptJson.puerta,
      error: ""
    }
  } catch (error) {
    console.log(error);
    return {
        id: 0,
        provincia: "",
        ayuntamiento: "",
        calle: "",
        numero: "",
        piso: "",
        puerta: "",
        error: "500"
      }
  }
}
