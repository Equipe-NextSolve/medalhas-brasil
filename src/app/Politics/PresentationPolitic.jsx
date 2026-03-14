import React from 'react'

export default function PresentationPolitic() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden bg-gradient-to-br from-gray via-gray to-gray">
            {/* efeito glow no fundo */}
            <div className="absolute w-[500px] h-[500px] bg-green/20 blur-[140px] rounded-full top-[-200px] right-[-200px]"></div>
            <div className="relative flex flex-col lg:flex-row max-w-6xl w-full rounded-2xl overflow-hidden shadow-2xl">

                <div className="lg:w-1/3 bg-darkGray flex items-center justify-center p-10">
                    <div className="w-28 h-28 border-2 border-green rounded-full flex items-center justify-center">
                        <span className="text-green text-3xl font-bold">MB</span>
                    </div>
                </div>

                <div className="lg:w-2/3 bg-white p-10 md:p-14">

                    <div className="mb-8 max-w-2xl mx-auto text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-black">
                            Este informativo tem como objetivo confirmar o compromisso com a
                            segurança dos dados de nossos clientes.
                        </h1>

                        <div className="w-32 h-[3px] bg-green mx-auto mt-4 rounded-full"></div>
                    </div>

                    <p className="text-darkGray leading-relaxed text-sm md:text-base text-center max-w-3xl mx-auto">
                        O site Medalhas Brasil informa que todos os dados coletados para fins
                        de contato com clientes, bem como aqueles utilizados para o envio de
                        propostas comerciais e negociações, são tratados com total sigilo,
                        segurança e responsabilidade.
                        <br /><br />
                        Ressaltamos que o site Medalhas Brasil tem como objetivo apresentar
                        nossa empresa, nossos produtos e a história de seu criador.
                        Entretanto, o atendimento e a comunicação com os clientes também
                        podem ocorrer por meio de outros canais oficiais, como WhatsApp
                        Corporativo, E-mail Empresarial e Instagram Profissional.
                        <br /><br />
                        Reafirmamos nosso compromisso com o cumprimento da legislação
                        vigente de proteção de dados, garantindo que todas as informações
                        fornecidas por nossos clientes sejam utilizadas de forma segura,
                        responsável e exclusivamente para os fins de atendimento e
                        relacionamento comercial.
                    </p>
                </div>
            </div>
        </section>
    )
}