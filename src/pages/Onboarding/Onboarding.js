/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User authentication page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { Page, PageContent, List, Link, Swiper, SwiperSlide } from 'framework7-react'
import { connect } from 'react-redux'
import isEmpty from 'validator/lib/isEmpty'

import PrimaryButton from '../../components/PrimaryButton'

import slide01Pic from '../../assets/vectors/onboarding-slide-01.svg'
import slide02Pic from '../../assets/vectors/onboarding-slide-02.svg'
import slide03Pic from '../../assets/vectors/onboarding-slide-03.svg'

import './Onboarding.scss'
import config from '../../config'

class Onboarding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  componentDidMount() {}

  isValidForm() {
    const { user } = this.state
    return !isEmpty(user.email) && !isEmpty(user.password)
  }

  render() {
    const pageTitle = 'Pictagram: Entrar'
    return (
      <Page className="onboarding-page">
        <Helmet title={pageTitle} />
        <PageContent>
          <article className="onboarding-page__content">
            <List className="onboarding-page__form">
              <Swiper pagination>
                <SwiperSlide>
                  <img src={slide01Pic} alt="Pictagram" className="onboarding-page__logo" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide02Pic} alt="Pictagram" className="onboarding-page__logo" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide03Pic} alt="Pictagram" className="onboarding-page__logo" />
                </SwiperSlide>
              </Swiper>
              <PrimaryButton
                fill
                color="primary"
                onClick={() => {
                  this.$f7router.navigate({ name: 'Login' })
                }}>
                Fazer login
              </PrimaryButton>
              <p className="onboarding-page__paragraph">
                Não possui uma conta?&nbsp;
                <Link
                  className="onboarding-page__link"
                  href={`${config.clientUrl}/signup`}
                  external>
                  Cadastre-se
                </Link>
              </p>
            </List>
          </article>
        </PageContent>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding)
