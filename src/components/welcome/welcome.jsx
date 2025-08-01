import PropTypes from 'prop-types';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Constraints from '@commercetools-uikit/constraints';
import Grid from '@commercetools-uikit/grid';
import { AngleRightIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import messages from './messages';
import styles from './welcome.module.css';
import WebDeveloperSvg from './web-developer.svg';

const WrapWith = (props) =>
  props.condition ? props.wrapper(props.children) : props.children;
WrapWith.displayName = 'WrapWith';
WrapWith.propTypes = {
  condition: PropTypes.bool.isRequired,
  wrapper: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const InfoCard = (props) => (
  <Grid.Item>
    <div className={styles.infoCard}>
      <Spacings.Stack scale="m">
        <Text.Headline as="h3">
          <WrapWith
            condition={true}
            wrapper={(children) =>
              props.isExternal ? (
                <a
                  className={styles.infoCardLink}
                  href={props.linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ) : (
                <RouterLink className={styles.infoCardLink} to={props.linkTo}>
                  {children}
                </RouterLink>
              )
            }
          >
            <Spacings.Inline scale="s" alignItems="center">
              <span>{props.title}</span>
              <AngleRightIcon size="big" color="primary" />
            </Spacings.Inline>
          </WrapWith>
        </Text.Headline>
        <Text.Body>{props.content}</Text.Body>
      </Spacings.Stack>
    </div>
  </Grid.Item>
);
InfoCard.displayName = 'InfoCard';
InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  isExternal: PropTypes.bool,
};

const Welcome = () => {
  const match = useRouteMatch();
  const intl = useIntl();

  return (
    <Constraints.Horizontal max={16}>
      <Spacings.Stack scale="xl">
        <Text.Headline as="h1" intlMessage={messages.title} />
        <Spacings.Stack scale="l">
          <Text.Subheadline as="h4" intlMessage={messages.subtitle} />
          <Grid
            gridGap="16px"
            gridAutoColumns="1fr"
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <InfoCard
              title={intl.formatMessage(messages.cardChannelsTitle)}
              content={intl.formatMessage(messages.cardChannelsContent)}
              linkTo={`${match.url}/channels`}
            />
            <InfoCard
            title={intl.formatMessage(messages.cardImportTitle)}
            content={intl.formatMessage(messages.cardImportContent)}
            linkTo={`${match.url}/import`}
          />
          </Grid>
        </Spacings.Stack>
      </Spacings.Stack>
    </Constraints.Horizontal>
  );
};
Welcome.displayName = 'Welcome';

export default Welcome;
