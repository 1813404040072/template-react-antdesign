import intl from 'react-intl-universal';
import messages from '../messages';

export default () => [
  {
    title: intl.formatMessage(messages.companyName),
    name: 'companyName',
    formItem: {
      rules: [
        {
          required: true,
          message: intl.formatMessage(messages.messageCompanyName),
        }
      ]
    }
  },
  {
    title: intl.formatMessage(messages.firstName),
    name: 'firstName',
    formItem: {
      rules: [
        {
          required: true,
          message: intl.formatMessage(messages.messageFirstName),
        }
      ]
    }
  },
  {
    title: intl.formatMessage(messages.lastName),
    name: 'lastName',
    formItem: {
      rules: [
        {
          required: true,
          message: intl.formatMessage(messages.messageLastName),
        }
      ]
    }
  },
  {
    title: intl.formatMessage(messages.email),
    name: 'email',
    formItem: {
      rules: [
        {
          required: true,
          message: intl.formatMessage(messages.messageEmail),
        },
        {
          type: 'email',
          message: intl.formatMessage(messages.messageEmailFormat)
        }
      ]
    }
  },
  {
    title: intl.formatMessage(messages.phoneNumber),
    name: 'phone_number',
    formItem: {
      type: 'number',
      rules: [
        { required: true, message: intl.formatMessage(messages.messagePhoneNumber) }
      ]
    }
  },
  {
    title: intl.formatMessage(messages.city),
    name: 'city',
    formItem: {
      rules: [
        {
          required: true,
          message: intl.formatMessage(messages.messageCity),
        }
      ]
    }
  },
  {
    title: intl.formatMessage(messages.state),
    name: 'state',
    formItem: {
      rules: [
        {
          required: true,
          message: intl.formatMessage(messages.messageState),
        }
      ]
    }
  },
  {
    title: intl.formatMessage(messages.country),
    name: 'country',
    formItem: {
      rules: [
        {
          required: true,
          message: intl.formatMessage(messages.messageCountry),
        }
      ]
    }
  },
];
