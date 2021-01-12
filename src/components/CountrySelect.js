import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

const paises = [
  { alpha2Code: 'AD', name: 'Andorra', callingCodes: ['376'] },
  { alpha2Code: 'AE', name: 'United Arab Emirates', callingCodes: ['971'] },
  { alpha2Code: 'AF', name: 'Afghanistan', callingCodes: ['93'] },
  { alpha2Code: 'AG', name: 'Antigua and Barbuda', callingCodes: ['1-268'] },
  { alpha2Code: 'AI', name: 'Anguilla', callingCodes: ['1-264'] },
  { alpha2Code: 'AL', name: 'Albania', callingCodes: ['355'] },
  { alpha2Code: 'AM', name: 'Armenia', callingCodes: ['374'] },
  { alpha2Code: 'AO', name: 'Angola', callingCodes: ['244'] },
  { alpha2Code: 'AQ', name: 'Antarctica', callingCodes: ['672'] },
  { alpha2Code: 'AR', name: 'Argentina', callingCodes: ['54'] },
  { alpha2Code: 'AS', name: 'American Samoa', callingCodes: ['1-684'] },
  { alpha2Code: 'AT', name: 'Austria', callingCodes: ['43'] },
  {
    alpha2Code: 'AU',
    name: 'Australia',
    callingCodes: ['61'],
    suggested: true,
  },
  { alpha2Code: 'AW', name: 'Aruba', callingCodes: ['297'] },
  { alpha2Code: 'AX', name: 'Alland Islands', callingCodes: ['358'] },
  { alpha2Code: 'AZ', name: 'Azerbaijan', callingCodes: ['994'] },
  { alpha2Code: 'BA', name: 'Bosnia and Herzegovina', callingCodes: ['387'] },
  { alpha2Code: 'BB', name: 'Barbados', callingCodes: ['1-246'] },
  { alpha2Code: 'BD', name: 'Bangladesh', callingCodes: ['880'] },
  { alpha2Code: 'BE', name: 'Belgium', callingCodes: ['32'] },
  { alpha2Code: 'BF', name: 'Burkina Faso', callingCodes: ['226'] },
  { alpha2Code: 'BG', name: 'Bulgaria', callingCodes: ['359'] },
  { alpha2Code: 'BH', name: 'Bahrain', callingCodes: ['973'] },
  { alpha2Code: 'BI', name: 'Burundi', callingCodes: ['257'] },
  { alpha2Code: 'BJ', name: 'Benin', callingCodes: ['229'] },
  { alpha2Code: 'BL', name: 'Saint Barthelemy', callingCodes: ['590'] },
  { alpha2Code: 'BM', name: 'Bermuda', callingCodes: ['1-441'] },
  { alpha2Code: 'BN', name: 'Brunei Darussalam', callingCodes: ['673'] },
  { alpha2Code: 'BO', name: 'Bolivia', callingCodes: ['591'] },
  { alpha2Code: 'BR', name: 'Brazil', callingCodes: ['55'] },
  { alpha2Code: 'BS', name: 'Bahamas', callingCodes: ['1-242'] },
  { alpha2Code: 'BT', name: 'Bhutan', callingCodes: ['975'] },
  { alpha2Code: 'BV', name: 'Bouvet Island', callingCodes: ['47'] },
  { alpha2Code: 'BW', name: 'Botswana', callingCodes: ['267'] },
  { alpha2Code: 'BY', name: 'Belarus', callingCodes: ['375'] },
  { alpha2Code: 'BZ', name: 'Belize', callingCodes: ['501'] },
  { alpha2Code: 'CA', name: 'Canada', callingCodes: ['1'], suggested: true },
  { alpha2Code: 'CC', name: 'Cocos (Keeling) Islands', callingCodes: ['61'] },
  {
    alpha2Code: 'CD',
    name: 'Congo, Democratic Republic of the',
    callingCodes: ['243'],
  },
  { alpha2Code: 'CF', name: 'Central African Republic', callingCodes: ['236'] },
  { alpha2Code: 'CG', name: 'Congo, Republic of the', callingCodes: ['242'] },
  { alpha2Code: 'CH', name: 'Switzerland', callingCodes: ['41'] },
  { alpha2Code: 'CI', name: "Cote d'Ivoire", callingCodes: ['225'] },
  { alpha2Code: 'CK', name: 'Cook Islands', callingCodes: ['682'] },
  { alpha2Code: 'CL', name: 'Chile', callingCodes: ['56'] },
  { alpha2Code: 'CM', name: 'Cameroon', callingCodes: ['237'] },
  { alpha2Code: 'CN', name: 'China', callingCodes: ['86'] },
  { alpha2Code: 'CO', name: 'Colombia', callingCodes: ['57'] },
  { alpha2Code: 'CR', name: 'Costa Rica', callingCodes: ['506'] },
  { alpha2Code: 'CU', name: 'Cuba', callingCodes: ['53'] },
  { alpha2Code: 'CV', name: 'Cape Verde', callingCodes: ['238'] },
  { alpha2Code: 'CW', name: 'Curacao', callingCodes: ['599'] },
  { alpha2Code: 'CX', name: 'Christmas Island', callingCodes: ['61'] },
  { alpha2Code: 'CY', name: 'Cyprus', callingCodes: ['357'] },
  { alpha2Code: 'CZ', name: 'Czech Republic', callingCodes: ['420'] },
  { alpha2Code: 'DE', name: 'Germany', callingCodes: ['49'], suggested: true },
  { alpha2Code: 'DJ', name: 'Djibouti', callingCodes: ['253'] },
  { alpha2Code: 'DK', name: 'Denmark', callingCodes: ['45'] },
  { alpha2Code: 'DM', name: 'Dominica', callingCodes: ['1-767'] },
  { alpha2Code: 'DO', name: 'Dominican Republic', callingCodes: ['1-809'] },
  { alpha2Code: 'DZ', name: 'Algeria', callingCodes: ['213'] },
  { alpha2Code: 'EC', name: 'Ecuador', callingCodes: ['593'] },
  { alpha2Code: 'EE', name: 'Estonia', callingCodes: ['372'] },
  { alpha2Code: 'EG', name: 'Egypt', callingCodes: ['20'] },
  { alpha2Code: 'EH', name: 'Western Sahara', callingCodes: ['212'] },
  { alpha2Code: 'ER', name: 'Eritrea', callingCodes: ['291'] },
  { alpha2Code: 'ES', name: 'Spain', callingCodes: ['34'] },
  { alpha2Code: 'ET', name: 'Ethiopia', callingCodes: ['251'] },
  { alpha2Code: 'FI', name: 'Finland', callingCodes: ['358'] },
  { alpha2Code: 'FJ', name: 'Fiji', callingCodes: ['679'] },
  {
    alpha2Code: 'FK',
    name: 'Falkland Islands (Malvinas)',
    callingCodes: ['500'],
  },
  {
    alpha2Code: 'FM',
    name: 'Micronesia, Federated States of',
    callingCodes: ['691'],
  },
  { alpha2Code: 'FO', name: 'Faroe Islands', callingCodes: ['298'] },
  { alpha2Code: 'FR', name: 'France', callingCodes: ['33'], suggested: true },
  { alpha2Code: 'GA', name: 'Gabon', callingCodes: ['241'] },
  { alpha2Code: 'GB', name: 'United Kingdom', callingCodes: ['44'] },
  { alpha2Code: 'GD', name: 'Grenada', callingCodes: ['1-473'] },
  { alpha2Code: 'GE', name: 'Georgia', callingCodes: ['995'] },
  { alpha2Code: 'GF', name: 'French Guiana', callingCodes: ['594'] },
  { alpha2Code: 'GG', name: 'Guernsey', callingCodes: ['44'] },
  { alpha2Code: 'GH', name: 'Ghana', callingCodes: ['233'] },
  { alpha2Code: 'GI', name: 'Gibraltar', callingCodes: ['350'] },
  { alpha2Code: 'GL', name: 'Greenland', callingCodes: ['299'] },
  { alpha2Code: 'GM', name: 'Gambia', callingCodes: ['220'] },
  { alpha2Code: 'GN', name: 'Guinea', callingCodes: ['224'] },
  { alpha2Code: 'GP', name: 'Guadeloupe', callingCodes: ['590'] },
  { alpha2Code: 'GQ', name: 'Equatorial Guinea', callingCodes: ['240'] },
  { alpha2Code: 'GR', name: 'Greece', callingCodes: ['30'] },
  {
    alpha2Code: 'GS',
    name: 'South Georgia and the South Sandwich Islands',
    callingCodes: ['500'],
  },
  { alpha2Code: 'GT', name: 'Guatemala', callingCodes: ['502'] },
  { alpha2Code: 'GU', name: 'Guam', callingCodes: ['1-671'] },
  { alpha2Code: 'GW', name: 'Guinea-Bissau', callingCodes: ['245'] },
  { alpha2Code: 'GY', name: 'Guyana', callingCodes: ['592'] },
  { alpha2Code: 'HK', name: 'Hong Kong', callingCodes: ['852'] },
  {
    alpha2Code: 'HM',
    name: 'Heard Island and McDonald Islands',
    callingCodes: ['672'],
  },
  { alpha2Code: 'HN', name: 'Honduras', callingCodes: ['504'] },
  { alpha2Code: 'HR', name: 'Croatia', callingCodes: ['385'] },
  { alpha2Code: 'HT', name: 'Haiti', callingCodes: ['509'] },
  { alpha2Code: 'HU', name: 'Hungary', callingCodes: ['36'] },
  { alpha2Code: 'ID', name: 'Indonesia', callingCodes: ['62'] },
  { alpha2Code: 'IE', name: 'Ireland', callingCodes: ['353'] },
  { alpha2Code: 'IL', name: 'Israel', callingCodes: ['972'] },
  { alpha2Code: 'IM', name: 'Isle of Man', callingCodes: ['44'] },
  { alpha2Code: 'IN', name: 'India', callingCodes: ['91'] },
  {
    alpha2Code: 'IO',
    name: 'British Indian Ocean Territory',
    callingCodes: ['246'],
  },
  { alpha2Code: 'IQ', name: 'Iraq', callingCodes: ['964'] },
  { alpha2Code: 'IR', name: 'Iran, Islamic Republic of', callingCodes: ['98'] },
  { alpha2Code: 'IS', name: 'Iceland', callingCodes: ['354'] },
  { alpha2Code: 'IT', name: 'Italy', callingCodes: ['39'] },
  { alpha2Code: 'JE', name: 'Jersey', callingCodes: ['44'] },
  { alpha2Code: 'JM', name: 'Jamaica', callingCodes: ['1-876'] },
  { alpha2Code: 'JO', name: 'Jordan', callingCodes: ['962'] },
  { alpha2Code: 'JP', name: 'Japan', callingCodes: ['81'], suggested: true },
  { alpha2Code: 'KE', name: 'Kenya', callingCodes: ['254'] },
  { alpha2Code: 'KG', name: 'Kyrgyzstan', callingCodes: ['996'] },
  { alpha2Code: 'KH', name: 'Cambodia', callingCodes: ['855'] },
  { alpha2Code: 'KI', name: 'Kiribati', callingCodes: ['686'] },
  { alpha2Code: 'KM', name: 'Comoros', callingCodes: ['269'] },
  { alpha2Code: 'KN', name: 'Saint Kitts and Nevis', callingCodes: ['1-869'] },
  {
    alpha2Code: 'KP',
    name: "Korea, Democratic People's Republic of",
    callingCodes: ['850'],
  },
  { alpha2Code: 'KR', name: 'Korea, Republic of', callingCodes: ['82'] },
  { alpha2Code: 'KW', name: 'Kuwait', callingCodes: ['965'] },
  { alpha2Code: 'KY', name: 'Cayman Islands', callingCodes: ['1-345'] },
  { alpha2Code: 'KZ', name: 'Kazakhstan', callingCodes: ['7'] },
  {
    alpha2Code: 'LA',
    name: "Lao People's Democratic Republic",
    callingCodes: ['856'],
  },
  { alpha2Code: 'LB', name: 'Lebanon', callingCodes: ['961'] },
  { alpha2Code: 'LC', name: 'Saint Lucia', callingCodes: ['1-758'] },
  { alpha2Code: 'LI', name: 'Liechtenstein', callingCodes: ['423'] },
  { alpha2Code: 'LK', name: 'Sri Lanka', callingCodes: ['94'] },
  { alpha2Code: 'LR', name: 'Liberia', callingCodes: ['231'] },
  { alpha2Code: 'LS', name: 'Lesotho', callingCodes: ['266'] },
  { alpha2Code: 'LT', name: 'Lithuania', callingCodes: ['370'] },
  { alpha2Code: 'LU', name: 'Luxembourg', callingCodes: ['352'] },
  { alpha2Code: 'LV', name: 'Latvia', callingCodes: ['371'] },
  { alpha2Code: 'LY', name: 'Libya', callingCodes: ['218'] },
  { alpha2Code: 'MA', name: 'Morocco', callingCodes: ['212'] },
  { alpha2Code: 'MC', name: 'Monaco', callingCodes: ['377'] },
  { alpha2Code: 'MD', name: 'Moldova, Republic of', callingCodes: ['373'] },
  { alpha2Code: 'ME', name: 'Montenegro', callingCodes: ['382'] },
  {
    alpha2Code: 'MF',
    name: 'Saint Martin (French part)',
    callingCodes: ['590'],
  },
  { alpha2Code: 'MG', name: 'Madagascar', callingCodes: ['261'] },
  { alpha2Code: 'MH', name: 'Marshall Islands', callingCodes: ['692'] },
  {
    alpha2Code: 'MK',
    name: 'Macedonia, the Former Yugoslav Republic of',
    callingCodes: ['389'],
  },
  { alpha2Code: 'ML', name: 'Mali', callingCodes: ['223'] },
  { alpha2Code: 'MM', name: 'Myanmar', callingCodes: ['95'] },
  { alpha2Code: 'MN', name: 'Mongolia', callingCodes: ['976'] },
  { alpha2Code: 'MO', name: 'Macao', callingCodes: ['853'] },
  {
    alpha2Code: 'MP',
    name: 'Northern Mariana Islands',
    callingCodes: ['1-670'],
  },
  { alpha2Code: 'MQ', name: 'Martinique', callingCodes: ['596'] },
  { alpha2Code: 'MR', name: 'Mauritania', callingCodes: ['222'] },
  { alpha2Code: 'MS', name: 'Montserrat', callingCodes: ['1-664'] },
  { alpha2Code: 'MT', name: 'Malta', callingCodes: ['356'] },
  { alpha2Code: 'MU', name: 'Mauritius', callingCodes: ['230'] },
  { alpha2Code: 'MV', name: 'Maldives', callingCodes: ['960'] },
  { alpha2Code: 'MW', name: 'Malawi', callingCodes: ['265'] },
  { alpha2Code: 'MX', name: 'Mexico', callingCodes: ['52'] },
  { alpha2Code: 'MY', name: 'Malaysia', callingCodes: ['60'] },
  { alpha2Code: 'MZ', name: 'Mozambique', callingCodes: ['258'] },
  { alpha2Code: 'NA', name: 'Namibia', callingCodes: ['264'] },
  { alpha2Code: 'NC', name: 'New Caledonia', callingCodes: ['687'] },
  { alpha2Code: 'NE', name: 'Niger', callingCodes: ['227'] },
  { alpha2Code: 'NF', name: 'Norfolk Island', callingCodes: ['672'] },
  { alpha2Code: 'NG', name: 'Nigeria', callingCodes: ['234'] },
  { alpha2Code: 'NI', name: 'Nicaragua', callingCodes: ['505'] },
  { alpha2Code: 'NL', name: 'Netherlands', callingCodes: ['31'] },
  { alpha2Code: 'NO', name: 'Norway', callingCodes: ['47'] },
  { alpha2Code: 'NP', name: 'Nepal', callingCodes: ['977'] },
  { alpha2Code: 'NR', name: 'Nauru', callingCodes: ['674'] },
  { alpha2Code: 'NU', name: 'Niue', callingCodes: ['683'] },
  { alpha2Code: 'NZ', name: 'New Zealand', callingCodes: ['64'] },
  { alpha2Code: 'OM', name: 'Oman', callingCodes: ['968'] },
  { alpha2Code: 'PA', name: 'Panama', callingCodes: ['507'] },
  { alpha2Code: 'PE', name: 'Peru', callingCodes: ['51'] },
  { alpha2Code: 'PF', name: 'French Polynesia', callingCodes: ['689'] },
  { alpha2Code: 'PG', name: 'Papua New Guinea', callingCodes: ['675'] },
  { alpha2Code: 'PH', name: 'Philippines', callingCodes: ['63'] },
  { alpha2Code: 'PK', name: 'Pakistan', callingCodes: ['92'] },
  { alpha2Code: 'PL', name: 'Poland', callingCodes: ['48'] },
  {
    alpha2Code: 'PM',
    name: 'Saint Pierre and Miquelon',
    callingCodes: ['508'],
  },
  { alpha2Code: 'PN', name: 'Pitcairn', callingCodes: ['870'] },
  { alpha2Code: 'PR', name: 'Puerto Rico', callingCodes: ['1'] },
  { alpha2Code: 'PS', name: 'Palestine, State of', callingCodes: ['970'] },
  { alpha2Code: 'PT', name: 'Portugal', callingCodes: ['351'] },
  { alpha2Code: 'PW', name: 'Palau', callingCodes: ['680'] },
  { alpha2Code: 'PY', name: 'Paraguay', callingCodes: ['595'] },
  { alpha2Code: 'QA', name: 'Qatar', callingCodes: ['974'] },
  { alpha2Code: 'RE', name: 'Reunion', callingCodes: ['262'] },
  { alpha2Code: 'RO', name: 'Romania', callingCodes: ['40'] },
  { alpha2Code: 'RS', name: 'Serbia', callingCodes: ['381'] },
  { alpha2Code: 'RU', name: 'Russian Federation', callingCodes: ['7'] },
  { alpha2Code: 'RW', name: 'Rwanda', callingCodes: ['250'] },
  { alpha2Code: 'SA', name: 'Saudi Arabia', callingCodes: ['966'] },
  { alpha2Code: 'SB', name: 'Solomon Islands', callingCodes: ['677'] },
  { alpha2Code: 'SC', name: 'Seychelles', callingCodes: ['248'] },
  { alpha2Code: 'SD', name: 'Sudan', callingCodes: ['249'] },
  { alpha2Code: 'SE', name: 'Sweden', callingCodes: ['46'] },
  { alpha2Code: 'SG', name: 'Singapore', callingCodes: ['65'] },
  { alpha2Code: 'SH', name: 'Saint Helena', callingCodes: ['290'] },
  { alpha2Code: 'SI', name: 'Slovenia', callingCodes: ['386'] },
  { alpha2Code: 'SJ', name: 'Svalbard and Jan Mayen', callingCodes: ['47'] },
  { alpha2Code: 'SK', name: 'Slovakia', callingCodes: ['421'] },
  { alpha2Code: 'SL', name: 'Sierra Leone', callingCodes: ['232'] },
  { alpha2Code: 'SM', name: 'San Marino', callingCodes: ['378'] },
  { alpha2Code: 'SN', name: 'Senegal', callingCodes: ['221'] },
  { alpha2Code: 'SO', name: 'Somalia', callingCodes: ['252'] },
  { alpha2Code: 'SR', name: 'Suriname', callingCodes: ['597'] },
  { alpha2Code: 'SS', name: 'South Sudan', callingCodes: ['211'] },
  { alpha2Code: 'ST', name: 'Sao Tome and Principe', callingCodes: ['239'] },
  { alpha2Code: 'SV', name: 'El Salvador', callingCodes: ['503'] },
  {
    alpha2Code: 'SX',
    name: 'Sint Maarten (Dutch part)',
    callingCodes: ['1-721'],
  },
  { alpha2Code: 'SY', name: 'Syrian Arab Republic', callingCodes: ['963'] },
  { alpha2Code: 'SZ', name: 'Swaziland', callingCodes: ['268'] },
  {
    alpha2Code: 'TC',
    name: 'Turks and Caicos Islands',
    callingCodes: ['1-649'],
  },
  { alpha2Code: 'TD', name: 'Chad', callingCodes: ['235'] },
  {
    alpha2Code: 'TF',
    name: 'French Southern Territories',
    callingCodes: ['262'],
  },
  { alpha2Code: 'TG', name: 'Togo', callingCodes: ['228'] },
  { alpha2Code: 'TH', name: 'Thailand', callingCodes: ['66'] },
  { alpha2Code: 'TJ', name: 'Tajikistan', callingCodes: ['992'] },
  { alpha2Code: 'TK', name: 'Tokelau', callingCodes: ['690'] },
  { alpha2Code: 'TL', name: 'Timor-Leste', callingCodes: ['670'] },
  { alpha2Code: 'TM', name: 'Turkmenistan', callingCodes: ['993'] },
  { alpha2Code: 'TN', name: 'Tunisia', callingCodes: ['216'] },
  { alpha2Code: 'TO', name: 'Tonga', callingCodes: ['676'] },
  { alpha2Code: 'TR', name: 'Turkey', callingCodes: ['90'] },
  { alpha2Code: 'TT', name: 'Trinidad and Tobago', callingCodes: ['1-868'] },
  { alpha2Code: 'TV', name: 'Tuvalu', callingCodes: ['688'] },
  {
    alpha2Code: 'TW',
    name: 'Taiwan, Province of China',
    callingCodes: ['886'],
  },
  {
    alpha2Code: 'TZ',
    name: 'United Republic of Tanzania',
    callingCodes: ['255'],
  },
  { alpha2Code: 'UA', name: 'Ukraine', callingCodes: ['380'] },
  { alpha2Code: 'UG', name: 'Uganda', callingCodes: ['256'] },
  {
    alpha2Code: 'US',
    name: 'United States',
    callingCodes: ['1'],
    suggested: true,
  },
  { alpha2Code: 'UY', name: 'Uruguay', callingCodes: ['598'] },
  { alpha2Code: 'UZ', name: 'Uzbekistan', callingCodes: ['998'] },
  {
    alpha2Code: 'VA',
    name: 'Holy See (Vatican City State)',
    callingCodes: ['379'],
  },
  {
    alpha2Code: 'VC',
    name: 'Saint Vincent and the Grenadines',
    callingCodes: ['1-784'],
  },
  { alpha2Code: 'VE', name: 'Venezuela', callingCodes: ['58'] },
  { alpha2Code: 'VG', name: 'British Virgin Islands', callingCodes: ['1-284'] },
  { alpha2Code: 'VI', name: 'US Virgin Islands', callingCodes: ['1-340'] },
  { alpha2Code: 'VN', name: 'Vietnam', callingCodes: ['84'] },
  { alpha2Code: 'VU', name: 'Vanuatu', callingCodes: ['678'] },
  { alpha2Code: 'WF', name: 'Wallis and Futuna', callingCodes: ['681'] },
  { alpha2Code: 'WS', name: 'Samoa', callingCodes: ['685'] },
  { alpha2Code: 'XK', name: 'Kosovo', callingCodes: ['383'] },
  { alpha2Code: 'YE', name: 'Yemen', callingCodes: ['967'] },
  { alpha2Code: 'YT', name: 'Mayotte', callingCodes: ['262'] },
  { alpha2Code: 'ZA', name: 'South Africa', callingCodes: ['27'] },
  { alpha2Code: 'ZM', name: 'Zambia', callingCodes: ['260'] },
  { alpha2Code: 'ZW', name: 'Zimbabwe', callingCodes: ['263'] },
];

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function CountrySelect({ onChange }) {
  const classes = useStyles();

  return (
    <Autocomplete
      onChange={onChange}
      id="country-select-demo"
      style={{ width: 300 }}
      options={paises}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(option) => (
        <React.Fragment>
          <span>{countryToFlag(option.alpha2Code)}</span>
          {option.name} ({option.alpha2Code}) +{option.callingCodes[0]}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Elegí un país"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

CountrySelect.propTypes = {
  onChange: PropTypes.func,
};
