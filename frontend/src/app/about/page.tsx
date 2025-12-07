export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-6xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
              Realista
            </h1>
            <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-light">
              Honestidad en los alquileres
            </p>
          </div>

          <div className="space-y-16">
            <section className="text-center">
              <p className="text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                Una plataforma donde quien busca alquiler puede encontrar
                reseñas HONESTAS sobre viviendas e inmobiliarias para poder
                tomar mejores decisiones.
              </p>
            </section>

            <section className="border-t border-gray-200 dark:border-gray-800 pt-16">
              <h2 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-8 text-center">
                Funciona así:
              </h2>
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 font-light">
                      1
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      Busca viviendas
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-light">
                      Encuentra reseñas en casas, pisos, bajos e inmobiliarias
                      en tu área.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 font-light">
                      2
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      Lee experiencias reales
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-light">
                      Escucha a otros inquilinos sobre las calidades y atención
                      al cliente.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 font-light">
                      3
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      Comparte tu historia!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-light">
                      Ayuda a otros escribiendo reseñas honestas.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t border-gray-200 dark:border-gray-800 pt-16 text-center">
              <h2 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-6">
                NUESTRA MISIÓN
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                Cada inquilino se merece saber qué están firmando. Estamos
                construyendo una comunidad donde los alquileres son más justos.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
