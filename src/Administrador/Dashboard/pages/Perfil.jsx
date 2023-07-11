import Content from "../components/Content";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import TaskContext from "../../../contexts/TaskContext";
import fotoPerfil from "../../../../public/img/foto_perfil.png";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function Perfil() {
  const { dadosUser, buscaDadosUsuario, deleteUser } = useContext(UserContext);
  const [Carregando, setCarregando] = useState(false);
  const { email, name, plano, tel } = dadosUser[0] || {};
  const navigate = useNavigate()

  useEffect(() => {
    async function listarUsuario() {
      setCarregando(true);
      await buscaDadosUsuario();
      setCarregando(false);
    }
    listarUsuario();
  }, []);


  function handleDeleteUser() {
    MySwal.fire({
      title: <strong>Apagar conta</strong>,
      html: <p>Tem certeza que deseja apagar sua conta essa ação não podera ser desfeita</p>,
      icon: 'warning',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: <small>Apagar conta</small>,
      cancelButtonText: <small>Cancelar</small>,
    }).then((result) => {
      
      if (result.isConfirmed) {
        deleteUser()
        MySwal.fire({
          title: <strong>Conta apagada</strong>,
          html: <p>Sua conta foi apaga com sucesso, você será redirecionado para a <b>HOME</b></p>,
          icon: 'success'
        }).then(() => {
          navigate('/login')
        })
      }

    })
  }

  return (
    <Content>
      <div className="card-header">
        <h3 className="card-title">Perfil de {name}</h3>
      </div>
      {Carregando ? (
        <h3>Aguarde...</h3>
      ) : (
        <div className="card-body my-5">
          <div className="text-center">
            <img
              src={fotoPerfil}
              alt="Foto de Perfil"
              className="rounded-circle img-perfil"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome completo
            </label>
            <input
              type="text"
              disabled
              className="form-control"
              id="nome"
              placeholder="Digite seu nome"
              defaultValue={name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              disabled
              className="form-control"
              id="email"
              placeholder="Digite seu e-mail"
              defaultValue={email}
            />
          </div>
          <div className="mb-3">
            <div className="row">
              <div className="col-md-11">
                <label htmlFor="tel" className="form-label">
                  Telefone
                </label>
                <input
                  type="tel"
                  disabled
                  className="form-control"
                  id="tel"
                  placeholder="Telefone"
                  defaultValue={tel}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="plano" className="form-label">
                  Plano selecionado
                </label>
                <select
                  disabled
                  className="form-control"
                  id="plano"
                  defaultValue={plano}
                  readOnly
                >
                  <option selected disabled value={plano}>
                    {plano}
                  </option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="dias" className="form-label">
                  Dias restantes
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  id="dias"
                  placeholder="dias"
                  value="30 dias"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <input
              type="text"
              disabled
              className="form-control bg-success text-white w-25"
              id="status"
              placeholder="Status do usuario"
              readOnly
              value="Ativo"
            />
          </div>
          <button type="button" onClick={handleDeleteUser} className="btn btn-danger">
            Excluir conta
          </button>
        </div>
      )}
    </Content>
  );
}
