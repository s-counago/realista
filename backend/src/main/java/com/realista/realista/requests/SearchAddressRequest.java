package com.realista.realista.requests;

public class SearchAddressRequest {
    private String provincia;
    private String ayuntamiento;
    private String calle;
    private String numero;
    private String piso;
    private String puerta;

    public String getProvincia() { return provincia; }
    public void setProvincia(String provincia) { this.provincia = provincia; }

    public String getAyuntamiento() { return ayuntamiento; }
    public void setAyuntamiento(String ayuntamiento) { this.ayuntamiento = ayuntamiento; }

    public String getCalle() { return calle; }
    public void setCalle(String calle) { this.calle = calle; }

    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public String getPiso() { return piso; }
    public void setPiso(String piso) { this.piso = piso; }

    public String getPuerta() { return puerta; }
    public void setPuerta(String puerta) { this.puerta = puerta; }
}
