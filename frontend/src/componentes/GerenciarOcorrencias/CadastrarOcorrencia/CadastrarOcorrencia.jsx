import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import ContextoUsuario from "../../../services/context.js";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";
import API_URL from "../../../config/api";

function InputGroup({ children, error }) {
  return (
    <div style={{ marginBottom: "6px", minHeight: error ? 70 : 52 }}>
      {children}
      <div style={{ minHeight: "18px" }}>
        {error && (
          <div style={{ color: 'red', fontSize: '13px', minHeight: "18px", marginTop: "2px" }}>{error}</div>
        )}
      </div>
    </div>
  );
}

function GuestSearchInput({ value, onChange, hospedes, style, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);

  // Filtrar hóspedes baseado no termo de busca
  const filteredHospedes = hospedes.filter(hospede =>
    hospede.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Atualizar o termo de busca quando um hóspede já está selecionado
  useEffect(() => {
    if (value && hospedes.length > 0) {
      const guest = hospedes.find(h => h.id.toString() === value.toString());
      if (guest) {
        setSelectedGuest(guest);
        setSearchTerm(guest.nome);
      }
    }
  }, [value, hospedes]);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsOpen(true);

    // Se o input estiver vazio, limpar a seleção
    if (!term) {
      setSelectedGuest(null);
      onChange({ target: { name: 'guest_id', value: '' } });
    }
  };

  const handleSelectGuest = (guest) => {
    setSelectedGuest(guest);
    setSearchTerm(guest.nome);
    setIsOpen(false);
    onChange({ target: { name: 'guest_id', value: guest.id } });
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay para permitir clique no item da lista
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        style={style}
        autoComplete="off"
      />

      {isOpen && filteredHospedes.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '2px solid #e77f3c',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          {filteredHospedes.slice(0, 10).map(hospede => (
            <div
              key={hospede.id}
              onClick={() => handleSelectGuest(hospede)}
              style={{
                padding: '12px',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0',
                fontSize: '14px',
                color: '#001b5e',
                backgroundColor: selectedGuest?.id === hospede.id ? '#f8f9fa' : 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = selectedGuest?.id === hospede.id ? '#f8f9fa' : 'white';
              }}
            >
              {hospede.nome}
            </div>
          ))}
          {filteredHospedes.length > 10 && (
            <div style={{
              padding: '8px 12px',
              fontSize: '12px',
              color: '#6c757d',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              ... e mais {filteredHospedes.length - 10} resultados
            </div>
          )}
        </div>
      )}

      {isOpen && searchTerm && filteredHospedes.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '2px solid #e77f3c',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '12px',
          fontSize: '14px',
          color: '#6c757d',
          textAlign: 'center',
          zIndex: 1000
        }}>
          Nenhum hóspede encontrado
        </div>
      )}
    </div>
  );
}

export default function CadastrarOcorrencia() {
  const navigate = useNavigate();
  const [usuario] = useContext(ContextoUsuario);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(null);

  const [form, setForm] = useState({
    guest_id: "",
    occurrence_type_id: "",
    description: "",
    registration_date: ""
  });

  // Pré-preencher com data atual
  useEffect(() => {
    const now = new Date();
    const currentDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);

    setForm(prev => ({
      ...prev,
      registration_date: currentDateTime
    }));
  }, []);

  const [hospedes, setHospedes] = useState([]);
  const [tiposOcorrencia, setTiposOcorrencia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hospedesRes, tiposRes] = await Promise.all([
          fetch(`${API_URL}/guests`),
          fetch(`${API_URL}/tipos-ocorrencia`)
        ]);

        if (hospedesRes.ok) {
          const hospedesData = await hospedesRes.json();
          setHospedes(hospedesData);
        }

        if (tiposRes.ok) {
          const tiposData = await tiposRes.json();
          setTiposOcorrencia(tiposData);
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };

    fetchData();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const submitOccurrence = (dataToSend) => {
    fetch(`${API_URL}/occurrences`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          setModalMessage(errorData.message || "Erro ao cadastrar ocorrência.");
          setShowModal(true);
          return;
        }
        navigate("/ocorrencias");
      })
      .catch((err) => {
        console.error("Erro ao cadastrar:", err);
        setModalMessage("Erro ao cadastrar ocorrência.");
        setShowModal(true);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!form.guest_id) {
      newErrors.guest_id = "Selecione um hóspede.";
    }

    if (!form.occurrence_type_id) {
      newErrors.occurrence_type_id = "Selecione o tipo de ocorrência.";
    }

    if (!form.registration_date) {
      newErrors.registration_date = "A data de registro é obrigatória.";
    }

    if (!form.description.trim()) {
      newErrors.description = "A descrição é obrigatória.";
    } else if (form.description.trim().length < 10) {
      newErrors.description = "A descrição deve ter pelo menos 10 caracteres.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Obter ID do usuário
    let userId = usuario?.id || usuario?.usuario_id || 1;

    const dataToSend = {
      guest_id: parseInt(form.guest_id),
      occurrence_type_id: parseInt(form.occurrence_type_id),
      description: form.description.trim(),
      registration_date: form.registration_date,
      registered_by_user_id: parseInt(userId)
    };

    // Verificar se é ocorrência grave
    const selectedType = tiposOcorrencia.find(tipo => tipo.id === parseInt(form.occurrence_type_id));
    if (selectedType && selectedType.nivel === 'Grave') {
      setPendingSubmit(dataToSend);
      setShowWarningModal(true);
    } else {
      submitOccurrence(dataToSend);
    }
  }

  const handleConfirmGrave = () => {
    setShowWarningModal(false);
    if (pendingSubmit) {
      submitOccurrence(pendingSubmit);
      setPendingSubmit(null);
    }
  };

  const handleCancelGrave = () => {
    setShowWarningModal(false);
    setPendingSubmit(null);
  };

  const styles = {
    fundo: {
      backgroundImage: `url(${fundo})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      minHeight: "100vh",
      paddingTop: "100px",
      paddingBottom: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    formBox: {
      backgroundColor: "#fff",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0, 27, 94, 0.3)",
      maxWidth: "900px",
      width: "100%",
      color: "#001b5e",
      fontFamily: "'Raleway', sans-serif",
    },
    formBox2: {
      padding: "40px",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "6px 0 0 0",
      borderRadius: "8px",
      border: "2px solid #e77f3c",
      fontSize: "14px",
      color: "#001b5e",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    button: {
      backgroundColor: "#e77f3c",
      color: "white",
      padding: "12px",
      width: "100%",
      borderRadius: "8px",
      border: "none",
      fontWeight: "bold",
      marginTop: "20px",
      cursor: "pointer",
      textDecoration: "none",
      transition: "background-color 0.3s ease",
    },
    buttonCancel: {
      backgroundColor: "#001b5e",
      color: "white",
      padding: "12px",
      width: "100%",
      borderRadius: "8px",
      border: "none",
      fontWeight: "bold",
      marginTop: "20px",
      cursor: "pointer",
      textDecoration: "none",
      transition: "background-color 0.3s ease",
    },
    label: {
      display: "block",
      fontWeight: "600",
      marginBottom: "6px",
      color: "#001b5e",
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '15px',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    },
    modalButton: {
      backgroundColor: '#001b5e',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '15px',
    }
  };

  return (
    <main style={styles.fundo}>
      <div style={styles.formBox}>
        <div style={styles.formBox2}>
          <h2 style={{ color: "#001b5e", marginBottom: "30px", textAlign: "center" }}>
            Cadastrar Nova Ocorrência
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <InputGroup error={errors.guest_id}>
                  <label style={styles.label}>Hóspede *</label>
                  <GuestSearchInput
                    value={form.guest_id}
                    onChange={handleChange}
                    hospedes={hospedes}
                    style={styles.input}
                    placeholder="Digite o nome do hóspede..."
                  />
                </InputGroup>
              </div>

              <div className="col-md-6">
                <InputGroup error={errors.occurrence_type_id}>
                  <label style={styles.label}>Tipo de Ocorrência *</label>
                  <select
                    name="occurrence_type_id"
                    value={form.occurrence_type_id}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    <option value="">Selecione o tipo</option>
                    {tiposOcorrencia.map(tipo => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nome} ({tipo.nivel})
                      </option>
                    ))}
                  </select>
                </InputGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <InputGroup error={errors.registration_date}>
                  <label style={styles.label}>Data e Hora da Ocorrência *</label>
                  <input
                    type="datetime-local"
                    name="registration_date"
                    value={form.registration_date}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </InputGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <InputGroup error={errors.description}>
                  <label style={styles.label}>Descrição da Ocorrência *</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    style={{ ...styles.input, minHeight: "120px", resize: "vertical" }}
                    placeholder="Descreva detalhadamente o que aconteceu..."
                  />
                </InputGroup>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <Link to="/ocorrencias" style={styles.buttonCancel} className="text-center d-block">
                  Cancelar
                </Link>
              </div>
              <div className="col-md-6">
                <button type="submit" style={styles.button}>
                  Cadastrar Ocorrência
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h4 style={{ color: '#001b5e', marginBottom: '15px' }}>Aviso</h4>
            <p style={{ color: '#001b5e' }}>{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              style={styles.modalButton}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showWarningModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "30px",
            maxWidth: "500px",
            width: "90%",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            fontFamily: "'Raleway', sans-serif"
          }}>
            <div style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span style={{ fontSize: '28px', color: '#ffc107' }}>⚠️</span>
              Atenção: Ocorrência Grave
            </div>

            <div style={{
              backgroundColor: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "20px"
            }}>
              <p style={{
                color: "#856404",
                marginBottom: '10px',
                lineHeight: '1.6',
                fontSize: '14px',
                margin: 0
              }}>
                Esta é uma ocorrência de nível <strong>GRAVE</strong>.
              </p>
              <p style={{
                color: "#856404",
                lineHeight: '1.6',
                fontSize: '14px',
                margin: '10px 0 0 0'
              }}>
                Um <strong>bloqueio automático de 3 meses</strong> será criado para este hóspede.
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={handleCancelGrave}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmGrave}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ffc107",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
