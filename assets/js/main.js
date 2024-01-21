class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.event();
  }

  event() {
    this.formulario.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    const camposValidos = this.camposSaoValidos()
    const senhasValidas = this.senhasSaoValidas()

    if (camposValidos && senhasValidas) {
      alert('Tudo liberado, papai!')
      this.formulario.submit();
    }
  }

  camposSaoValidos() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText

      if (!campo.value) {
        this.criaErro(campo, `O campo "${label}" não pode estar vazio!`)
        valid = false;
      }

      if (campo.classList.contains('cpf')) {
        if (!this.validaCPF(campo)) valid = false;
      }

      if (campo.classList.contains('usuario')) {
        if (!this.usuarioValido(campo)) valid = false;
      }
    }

    return valid;
  }

  usuarioValido(campo) {
    let usuario = campo.value;
    let valid = true;

    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'Usuário precisar ser maior que 3 caracteres e menor que 12.')
      valid = false;
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Apenas letras e números são aceitos!')
      valid = false;
    }
    return valid;
  }


  senhasSaoValidas(campo) {
    let valid = true;
    const senha1 = this.formulario.querySelector('.senha')
    const senha2 = this.formulario.querySelector('.repetir-senha')
    console.log()

    if (senha1.value !== senha2.value) {
      valid = false;
      this.criaErro(senha1, 'Campos senha e repetir senha precisar ser iguais.');
      this.criaErro(senha2, 'Campos senha e repetir senha precisar ser iguais.');
    }

    if (senha1.value.length < 6 || senha1.value.length > 12) {
      valid = false;
      this.criaErro(senha1, 'Insira uma senha com no mínimo 6 e no máximo 12 caracteres.')
    }

    return valid;
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if (!cpf.valida()) {
      this.criaErro(campo, 'Insira um CPF válido!')
      return false;
    }
    return true;
  }

  criaErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }

}

const validando = new ValidaFormulario();