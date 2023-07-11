import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Content from '../components/Content'
import TaskContext from '../../../contexts/TaskContext';


export default function NovoFornecedor() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { cadastrarPessoa } = useContext(TaskContext)
    const navigate = useNavigate()

    const validaRepresentante = {
        required: {
            value: true,
            message: 'O campo representante é obrigatorio'
        }
    }

    const validaCPF = {
        required: {
            value: true,
            message: 'O campo CPF é obrigatorio'
        }
    }

    const validaEmpresa = {
        required: {
            value: true,
            message: 'O campo empresa é obrigatorio'
        }
    }

    const validaCNPJ = {
        required: {
            value: true,
            message: 'O campo CNPJ é obrigatorio'
        }
    }

    const validaTelefone = {
        required: {
            value: true,
            message: 'Telefone é obrigatorio'
        },
        minLength: {
            value: 8,
            message: "Telefone deve conter no minimo 8 caracteres"
        },
    }

    async function onSubmit(data) {

        try {
            await cadastrarPessoa(data)
            navigate('/painel/fornecedores')
        } catch (error) {
            console.log('Não foi possível cadastrar o fornecedor', error.message)
        }
    }

    return (
        <Content>
            <div className="d-flex justify-content-between">
                <h2>Novo fornecedor</h2>
                <Button link="/painel/fornecedores" title="Voltar" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} action="" className='my-4'>

                <label className='mt-4 form-label' htmlFor="nome">Representante</label>
                <input type="text" name="nome" id="nome" className='form-control' placeholder='Nome do representante' {...register("nome", validaRepresentante)}/>
                {errors.nome && <p>{errors.nome.message}</p>}

                <input type="text" name="tipo" className='d-none' defaultValue="pessoa" {...register("tipo")}/>

                <label className='mt-4 form-label' htmlFor="cpf">CPF</label>
                <input type="number" name="cpf" id="cpf" className='form-control' placeholder='CPF' {...register("cpf", validaCPF)}/>
                {errors.cpf && <p>{errors.cpf.message}</p>}

                <label className='mt-4 form-label' htmlFor="empresa">Empresa</label>
                <input type="text" name="empresa" id="empresa" className='form-control' placeholder='Razão Social' {...register("empresa", validaEmpresa)} />
                {errors.empresa && <p>{errors.empresa.message}</p>}

                <label className='mt-4 form-label' htmlFor="cnpj">CNPJ</label>
                <input type="number" name="cnpj" id="cnpj" className='form-control' placeholder='CNPJ' {...register("cnpj", validaCNPJ)}/>
                {errors.cnpj && <p>{errors.cnpj.message}</p>}
                

                <label className='mt-4 form-label' htmlFor="telefone">Telefone</label>
                <input type="tel" name="telefone" id="telefone" className='form-control' placeholder='Telefone' {...register("telefone", validaTelefone)} />
                {errors.telefone && <p>{errors.telefone.message}</p>}

                <button className='btn btn-success mt-4'>Salvar</button>

            </form>
        </Content >
    );
}