import { useState } from 'react'

import menuFechado from './assets/closed-menu.svg'
import menuAberto from './assets/open-menu.svg'
import activeHome from './assets/active-home.svg'
import inactiveLike from './assets/inactive-like.svg'
import inactiveSettings from './assets/inactive-settings.svg'
import likeButton from './assets/like.svg'
import modalPrevious from './assets/prev.svg'
import modalNext from './assets/next.svg'
import close from './assets/close-modal.svg'

//gallery

import foto1 from './assets/gallery/image 1.png'
import foto2 from './assets/gallery/image 2.png'
import foto3 from './assets/gallery/image 3.png'
import foto4 from './assets/gallery/image 4.png'
import foto5 from './assets/gallery/image 5.png'
import foto6 from './assets/gallery/image 6.png'
import foto7 from './assets/gallery/image 7.png'
import foto8 from './assets/gallery/image 8.png'
import foto9 from './assets/gallery/image 9.png'
import foto10 from './assets/gallery/image 10.png'

import './App.css'
import './css/layout.css'
import './css/spacing.css'

const listaGaleria = [
  {
    src: foto1,
    id: 1,
    alt: 'rato',
    title: 'Ratinho',
    date: '1 mês atrás',
    like: false,
  },
  {
    src: foto2,
    id: 2,
    alt: 'gato',
    title: 'Gatinho',
    date: '1 mês atrás',
    like: false,
  },
  {
    src: foto3,
    id: 3,
    alt: 'cachorro',
    title: 'Cachorro',
    date: '1 mês atrás',
    like: false,
  },
  {
    src: foto4,
    id: 4,
    alt: 'gorila',
    title: 'Gorila',
    date: '1 mês atrás',
    like: false,
  },
  {
    src: foto5,
    id: 5,
    alt: 'borboleta',
    title: 'Borboleta',
    date: '1 mês atrás',
    like: false,
  },
  {
    src: foto6,
    id: 6,
    alt: 'onça',
    title: 'Onça',
    date: '1 mês atrás',
    like: false,
  },
  {
    src: foto7,
    id: 7,
    alt: 'raposa',
    title: 'Raposa',
    date: '1 mês atrás',
    like: false,
  },
  {
    src: foto8,
    id: 8,
    alt: 'lobo',
    title: 'Lobinho',
    date: '1 mês atrás',
    like: false,
  },
  {
    src: foto9,
    id: 9,
    alt: 'tartaruga',
    title: 'Tartaruga',
    date: '1 mês atrás',
    like: false,
  },
  {
    src: foto10,
    id: 10,
    alt: 'leao',
    title: 'Leão',
    date: '1 mês atrás',
    like: false,
  },
]

function AsideButton({ show, src, alt, children, estado }) {
  return (
    <button className="flex-row align-center">
      <img src={src} alt={alt} />
      <span
        className={`menu-label ${
          estado === 'ativo' ? 'menu-label__active' : ''
        } ${show === false ? 'hidden' : ''} ml-4`}
      >
        {children}
      </span>
    </button>
  )
}

function Aside({ handleAsideClick, show }) {
  return (
    <aside className="side-menu flex-column ">
      <button className="menu-button" onClick={() => handleAsideClick()}>
        <img
          className="menu-fechado"
          src={show === true ? menuAberto : menuFechado}
          alt="Menu fechado"
        />
      </button>
      <div>
        <AsideButton show={show} src={activeHome} alt={'home'} estado={'ativo'}>
          Início
        </AsideButton>
      </div>
      <div className="mb-auto">
        <AsideButton
          show={show}
          src={inactiveLike}
          alt={'favoritos'}
          estado={'inativo'}
        >
          Favoritos
        </AsideButton>
      </div>
      <div>
        <AsideButton
          show={show}
          src={inactiveSettings}
          alt={'configuracoes'}
          estado={'inativo'}
        >
          Configurações
        </AsideButton>
      </div>
    </aside>
  )
}

function GalleryItem({ src, id, alt, title, date, handleGalleryClick, like }) {
  return (
    <div className="gallery__item">
      <img
        className="gallery__img mb-2"
        src={src}
        id={id}
        alt={alt}
        onClick={handleGalleryClick}
      />
      <img
        className={`gallery__like ${like ? '' : 'hidden'}`}
        src={likeButton}
        alt="curtir"
      />
      <div className="flex-row justify-between">
        <span className="item__title">{title}</span>
        <span className="item__date">{date}</span>
      </div>
    </div>
  )
}

function Gallery({ handleGalleryClick }) {
  return (
    <div className="main flex-column align-center">
      <h1 className="mb-7">Início</h1>
      <div className="gallery flex-row flex-wrap align-center justify-center">
        {listaGaleria.map(function (tarefa) {
          return (
            <GalleryItem
              src={tarefa.src}
              id={tarefa.id}
              alt={tarefa.alt}
              title={tarefa.title}
              date={tarefa.date}
              like={tarefa.like}
              handleGalleryClick={() =>
                handleGalleryClick(tarefa.id, tarefa.src, tarefa.like)
              }
            ></GalleryItem>
          )
        })}
      </div>
    </div>
  )
}

function Modal({
  showModal,
  handleGalleryClick,
  modalPicture,
  like,
  setLike,
  setModalPicture,
}) {
  function showLike() {
    const liked = listaGaleria.find((item) => item.src === modalPicture)
    liked.like = liked.like === true ? false : true

    setLike(liked.like)
  }

  function handlePrevious() {
    const atual = listaGaleria.find((item) => item.src === modalPicture)

    const newId = atual.id === 1 ? listaGaleria.length : atual.id - 1

    const newItem = listaGaleria.find((item) => item.id === newId)

    setModalPicture(newItem.src)
    setLike(newItem.like)
  }

  function handleNext() {
    const atual = listaGaleria.find((item) => item.src === modalPicture)

    const newId = atual.id === listaGaleria.length ? 1 : atual.id + 1

    const newItem = listaGaleria.find((item) => item.id === newId)

    setModalPicture(newItem.src)
    setLike(newItem.like)
  }

  return (
    <div
      className={`modal${
        !showModal ? 'hidden' : ''
      } flex-row justify-center align-center`}
    >
      <button
        className="modal__button modal__button--close"
        onClick={() => handleGalleryClick()}
      >
        <img src={close} alt="Fechar" />
      </button>
      <div className="modal__container flex-row align-center">
        <img
          className="modal__button modal__button--previous"
          src={modalPrevious}
          alt="Anterior"
          onClick={() => handlePrevious()}
        />
        <img
          className="modal__image"
          alt="imagem"
          src={modalPicture}
          onDoubleClick={() => {
            showLike(like)
          }}
        />
        <img
          className={`modal__like ${like ? '' : 'hidden'}`}
          src={likeButton}
          alt="Like"
        />
        <img
          className="modal__button modal__button--next"
          src={modalNext}
          alt="Próxima"
          onClick={() => handleNext()}
        />
      </div>
    </div>
  )
}

function App() {
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalPicture, setModalPicture] = useState()
  const [like, setLike] = useState(false)

  function handleAsideClick() {
    show === false ? setShow(true) : setShow(false)
  }

  function handleGalleryClick(id, src, like) {
    !showModal ? setShowModal(true) : setShowModal(false)
    setModalPicture(src)
    setLike(like)
  }

  return (
    <div className="App">
      <Aside handleAsideClick={handleAsideClick} show={show}></Aside>
      <Gallery handleGalleryClick={handleGalleryClick}></Gallery>
      <Modal
        showModal={showModal}
        handleGalleryClick={handleGalleryClick}
      
        modalPicture={modalPicture}
        like={like}
        setLike={setLike}
        setModalPicture={setModalPicture}
      ></Modal>
    </div>
  )
}

export default App
