"use client";

import React, { useState } from "react";

const catQuestions = [
  "Nunca tenho tosse / Tenho tosse o tempo todo",
  "Não tenho nenhum catarro (secreção) no peito / O meu peito está cheio de catarro (secreção)",
  "Não sinto nenhuma pressão no peito / Sinto uma grande pressão no peito",
  "Não sinto falta de ar quando subo uma ladeira ou um andar de escada / Sinto bastante falta de ar quando subo uma ladeira ou um andar de escada",
  "Não tenho nenhuma limitação em casa devido à minha doença pulmonar / Tenho total limitação em casa devido à minha doença pulmonar",
  "Me sinto confiante para sair de casa apesar da minha doença pulmonar / Não me sinto nada confiante para sair de casa devido à minha doença pulmonar",
  "Durmo profundamente / Não durmo nada profundamente por causa da minha doença pulmonar",
  "Tenho muita energia / Não tenho nenhuma energia",
];

const mmrcOptions = [
  { value: 0, label: "0 - Sem falta de ar, exceto em exercícios intensos" },
  {
    value: 1,
    label: "1 - Falta de ar ao apressar-se ou subir uma ladeira leve",
  },
  {
    value: 2,
    label:
      "2 - Anda mais devagar que pessoas da mesma idade ou precisa parar para respirar ao andar no próprio ritmo",
  },
  {
    value: 3,
    label:
      "3 - Para para respirar após andar cerca de 100 metros ou poucos minutos",
  },
  {
    value: 4,
    label: "4 - Muito falta de ar para sair de casa ou ao se vestir",
  },
];

const borgLevels = [
  "0 - Repouso (Sem esforço)",
  "1 - Demasiado leve (Esforço físico mínimo)",
  "2 - Muito leve",
  "3 - Muito leve-leve",
  "4 - Leve (O paciente sente um leve calor, mas percebe que ainda está muito fácil)",
  "5 - Leve-moderado",
  "6 - Moderado (O paciente sente um cansaço moderado, porém ainda consegue conversar durante o treino sem perder o fôlego)",
  "7 - Moderado-intenso",
  "8 - Intenso (O paciente sente um cansaço grande e não consegue conversar durante o treino, porque fica sem fôlego)",
  "9 - Muito intenso",
  "10 - Exaustivo (O paciente sente-se extremamente cansado e sem fôlego)",
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [exac, setExac] = useState(0); // Exacerbações sem hospitalização
  const [exacHosp, setExacHosp] = useState(0); // Exacerbações com hospitalização
  const [mmrc, setMmrc] = useState<number | null>(null);
  const [cat, setCat] = useState<number[]>(Array(8).fill(0));
  const [borg, setBorg] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white font-roboto">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-2 sm:p-6 flex flex-col gap-6 mx-auto mt-2 mb-2 sm:mt-8 sm:mb-8 border border-blue-100">
        {step === 0 && (
          <>
            <h2 className="font-semibold text-lg mb-2">
              1. Exacerbações no último ano
            </h2>
            <label className="block mb-2">
              Quantas exacerbações sem hospitalização?
            </label>
            <input
              type="number"
              min={0}
              value={exac}
              onChange={(e) => setExac(Number(e.target.value))}
              className="border rounded-lg px-2 py-1 w-24 mb-4 border-blue-200 focus:ring-2 focus:ring-blue-400 bg-blue-50"
            />
            <label className="block mb-2">
              Quantas exacerbações com hospitalização?
            </label>
            <input
              type="number"
              min={0}
              value={exacHosp}
              onChange={(e) => setExacHosp(Number(e.target.value))}
              className="border rounded-lg px-2 py-1 w-24 mb-4 border-blue-200 focus:ring-2 focus:ring-blue-400 bg-blue-50"
            />
            <button
              className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium shadow-md transition"
              onClick={() => setStep(1)}
            >
              Próximo
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <h2 className="font-semibold text-lg mb-2 text-blue-900">
              2. Escala mMRC
            </h2>
            <ul className="flex flex-col gap-3">
              {mmrcOptions.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    className={`w-full flex items-center gap-3 rounded-lg border-2 px-3 py-3 font-medium text-left transition
                      ${
                        mmrc === opt.value
                          ? "bg-blue-700 text-white border-blue-700 shadow-md"
                          : "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
                      }
                    `}
                    onClick={() => setMmrc(opt.value)}
                    aria-label={`Selecionar opção: ${opt.label}`}
                  >
                    <span
                      className={`flex items-center justify-center w-7 h-7 min-w-7 min-h-7 max-w-7 max-h-7 rounded-md border-2 mr-2
                      ${
                        mmrc === opt.value
                          ? "bg-blue-700 border-blue-700 text-white"
                          : "bg-white border-blue-300 text-blue-700"
                      }`}
                      style={{ flexShrink: 0 }}
                    >
                      {mmrc === opt.value ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : null}
                    </span>
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded-lg font-medium"
                onClick={() => setStep(0)}
              >
                Voltar
              </button>
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium shadow-md transition disabled:opacity-50"
                onClick={() => setStep(2)}
                disabled={mmrc === null}
              >
                Próximo
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="font-semibold text-lg mb-2 text-blue-900">
              3. Teste CAT
            </h2>
            <ul className="flex flex-col gap-4">
              {catQuestions.map((q, i) => (
                <li key={i} className="flex flex-col gap-1">
                  <span className="text-sm font-medium mb-1 text-gray-900">
                    {q}
                  </span>
                  <div className="flex gap-2 justify-between">
                    {[0, 1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        type="button"
                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold text-base transition
                          ${
                            cat[i] === v
                              ? "bg-blue-700 text-white border-blue-700 shadow-md"
                              : "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
                          }
                        `}
                        onClick={() =>
                          setCat((ans) =>
                            ans.map((a, idx) => (idx === i ? v : a))
                          )
                        }
                        aria-label={`Selecionar valor ${v} para questão ${
                          i + 1
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded-lg font-medium"
                onClick={() => setStep(1)}
              >
                Voltar
              </button>
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium shadow-md transition disabled:opacity-50"
                onClick={() => setStep(3)}
                disabled={cat.some((v) => v === null || v === undefined)}
              >
                Próximo
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="font-semibold text-lg mb-2 text-blue-900">
              4. Escala de Borg
            </h2>
            <ul className="flex flex-col gap-3">
              {borgLevels.map((label, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    className={`w-full flex items-center gap-3 rounded-lg border-2 px-3 py-3 font-medium text-left transition
                      ${
                        borg === label
                          ? "bg-blue-700 text-white border-blue-700 shadow-md"
                          : "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
                      }
                    `}
                    onClick={() => setBorg(label)}
                    aria-label={`Selecionar opção: ${label}`}
                  >
                    <span
                      className={`flex items-center justify-center w-7 h-7 min-w-7 min-h-7 max-w-7 max-h-7 rounded-md border-2 mr-2
                      ${
                        borg === label
                          ? "bg-blue-700 border-blue-700 text-white"
                          : "bg-white border-blue-300 text-blue-700"
                      }`}
                      style={{ flexShrink: 0 }}
                    >
                      {borg === label ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : null}
                    </span>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded-lg font-medium"
                onClick={() => setStep(2)}
              >
                Voltar
              </button>
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium shadow-md transition disabled:opacity-50"
                onClick={() => setStep(4)}
                disabled={borg === null}
              >
                Ver resultados
              </button>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <h2 className="font-semibold text-center text-lg mb-2">
              Resultados
            </h2>
            <div className="bg-blue-50 rounded p-4 flex flex-col gap-2 mb-4">
              <div>
                <strong>Exacerbações sem hospitalização:</strong> {exac}
              </div>
              <div>
                <strong>Exacerbações com hospitalização:</strong> {exacHosp}
              </div>
              <div>
                <strong>mMRC:</strong> {mmrc}
              </div>
              <div>
                <strong>CAT:</strong> {cat.reduce((a, b) => a + b, 0)}
              </div>
              <div>
                <strong>Borg:</strong> {borg}
              </div>
            </div>
            <div className="overflow-x-auto mt-2">
              <GoldTable
                exac={exac}
                exacHosp={exacHosp}
                mmrc={mmrc}
                catTotal={cat.reduce((a, b) => a + b, 0)}
              />
            </div>
            <button
              className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium shadow-md transition disabled:opacity-50 w-full sm:w-auto"
              onClick={() => {
                setStep(0);
                setExac(0);
                setExacHosp(0);
                setMmrc(null);
                setCat(Array(8).fill(0));
                setBorg(null);
              }}
            >
              Refazer cálculo
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function GoldTable({
  exac,
  exacHosp,
  mmrc,
  catTotal,
}: {
  exac: number;
  exacHosp: number;
  mmrc: number | null;
  catTotal: number;
}) {
  let highlight = "";
  if (exacHosp >= 1 || exac >= 2) highlight = "E";
  else if (mmrc !== null && (mmrc >= 2 || catTotal >= 10)) highlight = "B";
  else if (mmrc !== null && mmrc <= 1 && catTotal < 10) highlight = "A";

  return (
    <div className="flex flex-col items-center">
      <table className="border-collapse text-xs md:text-base mx-auto">
        <thead>
          <tr>
            <th className="border px-2 py-1 bg-white text-center align-middle">
              Histórico de exacerbações
            </th>
            <th
              className="border px-2 py-1 bg-white text-center align-middle"
              colSpan={2}
            >
              Sintomas
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1 bg-white text-center align-middle font-bold">
              ≥ 2 exacerbações
              <br />
              ou
              <br />1 exacerbação (com necessidade de internação)
            </td>
            <td
              className={`border px-2 py-4 text-center font-bold align-middle relative ${
                highlight === "E" ? "animate-gold-highlight" : ""
              }`}
              colSpan={2}
            >
              <span className="text-blue-900 text-center block">
                GOLD E<br />
                LABA + LAMA
                <br />
                <span className="text-xs font-normal text-center block">
                  Considerar LABA + LAMA + ICS se eosinófilos &gt; 300
                </span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="border px-2 py-1 bg-white text-center align-middle font-bold">
              0 ou 1 exacerbação
              <br /> (sem necessidade de internação)
            </td>
            <td
              className={`border px-2 py-4 text-center font-bold align-middle relative ${
                highlight === "A" ? "animate-gold-highlight" : ""
              }`}
            >
              <span className="text-cyan-900 text-center block">
                GOLD A<br />
                <span className="text-xs font-normal text-center block">
                  Broncodilatador
                </span>
              </span>
            </td>
            <td
              className={`border px-2 py-4 text-center font-bold align-middle relative ${
                highlight === "B" ? "animate-gold-highlight" : ""
              }`}
            >
              <span className="text-cyan-900 text-center block">
                GOLD B<br />
                <span className="text-xs font-normal text-center block">
                  LABA + LAMA
                </span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="border px-2 py-1 bg-white text-center font-bold"></td>
            <td className="border px-2 py-1 bg-white text-center align-middle">
              mMRC 0-1
              <br />
              CAT &lt; 10
            </td>
            <td className="border px-2 py-1 bg-white text-center align-middle">
              mMRC ≥ 2<br />
              CAT ≥ 10
            </td>
          </tr>
        </tbody>
      </table>
      <style jsx>{`
        .animate-gold-highlight {
          position: relative;
          animation: gold-blink 1s steps(2, start) infinite;
          border: 3px solid red !important;
          border-radius: 8px;
        }
        @keyframes gold-blink {
          0% {
            border-color: red;
          }
          50% {
            border-color: transparent;
          }
          100% {
            border-color: red;
          }
        }
      `}</style>
    </div>
  );
}
