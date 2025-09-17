import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ContextoUsuario from "../../../services/context.js";
import fundo from "../../WebsiteDesign/HeaderandFooterImages/Fundo.png";

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

export default function EditarOcorrencia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario] = useContext(ContextoUsuario);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [form, setForm] = useState({
    guest_id: "",
    guest_name: "",
    occurrence_type_id: "",
    description: "",
    registration_date: ""
  });

  const [hospedes, setHospedes] = useState([]);
  const [tiposOcorrencia, setTiposOcorrencia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          fetch("http://localhost:3001/guests"),
          fetch("http://localhost:3001/tipos-ocorrencia")
        ];

        if (id) {
          requests.push(fetch(`http://localhost:3001/occurrences/${id}`));
        }

        const responses = await Promise.all(requests);
        const [hospedesRes, tiposRes, occurrenceRes] = responses;

        if (hospedesRes.ok) {
          const hospedesData = await hospedesRes.json();
          setHospedes(hospedesData);
        }

        if (tiposRes.ok) {
          const tiposData = await tiposRes.json();
          setTiposOcorrencia(tiposData);
        }

        if (id && occurrenceRes) {
          if (occurrenceRes.ok) {
            const occurrenceData = await occurrenceRes.json();

            // Formatar a data corretamente para o input datetime-local
            let formattedDate = "";
            if (occurrenceData.registration_date) {
              const date = new Date(occurrenceData.registration_date);
              // Ajustar para timezone local e formatar para YYYY-MM-DDTHH:MM
              const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
              formattedDate = localDate.toISOString().slice(0, 16);
            }

            setForm({
              guest_id: occurrenceData.guest_id || "",
              guest_name: occurrenceData.guest?.nome || "",
              occurrence_type_id: occurrenceData.occurrence_type_id || "",
              description: occurrenceData.description || "",
              registration_date: formattedDate
            });
          } else {
            console.error('Erro ao carregar ocorrência - Status:', occurrenceRes.status);
            setModalMessage("Erro ao carregar dados da ocorrência.");
            setShowModal(true);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setModalMessage("Erro ao carregar dados.");
        setShowModal(true);
      }
    };

    fetchData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

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

    const url = id
      ? `http://localhost:3001/occurrences/${id}`
      : "http://localhost:3001/occurrences";
    const method = id ? "PUT" : "POST";


    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          setModalMessage(errorData.message || "Erro ao salvar ocorrência.");
          setShowModal(true);
          return;
        }
        navigate("/ocorrencias");
      })
      .catch((err) => {
        console.error("Erro ao salvar:", err);
        setModalMessage("Erro ao salvar ocorrência.");
        setShowModal(true);
      });
  }

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
            {id ? "Editar Ocorrência" : "Cadastrar Nova Ocorrência"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <InputGroup>
                  <label style={styles.label}>Hóspede</label>
                  <input
                    type="text"
                    value={form.guest_name}
                    style={{ ...styles.input, backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
                    disabled
                    readOnly
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
                  {id ? "Atualizar Ocorrência" : "Cadastrar Ocorrência"}
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
    </main>
  );
}