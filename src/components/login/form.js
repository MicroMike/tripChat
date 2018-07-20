import t from 'tcomb-form-native';
import I18n from 'i18n';

export default (component) => {

  state = component.state

  const emailError = () => {
    const email = state.form.email
    console.log('start validation', email)

    if (!email) {
      return false
    }

    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email.toLowerCase())) {
      console.log('emailInvalid')
      return I18n.t('login.emailInvalid')
    }

    if (state.emailAlreadyUsed) {
      console.log('emailAlreadyUsed')
      return I18n.t('login.emailAlreadyUsed')
    }

    console.log('no error')
    return false
  }

  const Email = t.refinement(t.String, email => emailError)

  const form = {
    options: {
      fields: {
        email: {
          label: I18n.t('login.email'),
          error: emailError(),
          onChange: () => { component.setState({ emailAlreadyUsed: false }) }
        },
        username: {
          label: I18n.t('login.username')
        },
        password: {
          label: I18n.t('login.password'),
          password: true,
          secureTextEntry: true
        },
        gender: {
          label: I18n.t('login.gender.label')
        },
      },
    },

    Login: t.struct({
      email: Email,
      password: t.String,
    }),

    Signin: t.struct({
      email: Email,
      username: t.String,
      password: t.String,
      gender: t.enums({
        M: I18n.t('login.gender.male'),
        F: I18n.t('login.gender.female')
      })
      // terms: t.Boolean
    })
  }

  for (key in form.options.fields) {
    const field = form.options.fields[key]
    form.options.fields[key] = {
      ...field,
      onchange: () => {
        console.log('change')
        state.refs.form.validate()
        field.onchange()
      }
    }
  }

  return form
}