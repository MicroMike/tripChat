import t from 'tcomb-form-native'
import I18n from 'i18n'

const transformer = {
  format: value => value ? value : null,
  parse: value => value ? value.trim() : null
}

export default (component) => {

  const state = component.state

  const emailError = () => {
    const email = state.form.email
    console.log('start validation', email)

    if (!email) {
      return false
    }

    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email)) {
      console.log('emailInvalid')
      return I18n.t('login.email.emailInvalid')
    }

    if (state.emailAlreadyUsed) {
      console.log('emailAlreadyUsed')
      return I18n.t('login.email.emailAlreadyUsed')
    }

    if (state.userNotFound) {
      console.log('userNotFound')
      return I18n.t('login.email.userNotFound')
    }

    console.log('no error')
    return false
  }

  const Email = t.refinement(t.String, () => !emailError())

  const form = {
    options: {
      fields: {
        email: {
          label: I18n.t('login.email.label'),
          error: emailError,
          onChange: component.reset,
          transformer
        },
        username: {
          label: I18n.t('login.username'),
          transformer
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

  // for (key in form.options.fields) {
  //   const field = form.options.fields[key]
  //   form.options.fields[key] = {
  //     ...field,
  //     onchange: () => {
  //       console.log('change')
  //       state.refs.form.validate()
  //       field.onchange()
  //     }
  //   }
  // }

  return form
}