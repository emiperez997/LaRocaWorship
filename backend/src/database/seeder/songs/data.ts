import { Song } from '@src/songs/entities/song.entity';

export const songs: Partial<Song>[] = [
  {
    title: 'Cantando Santo',
    lyrics:
      '[A] [E] [F#m] [D] \nYo quiero estar, adorandote Señor \n [A] [E] [D] \nPostrado hoy ante tu altar \n [A] [E] \nCantando Santo, Santo \n [F#m] [D] \nSanto es el Señor \n [A] [E] [D] \nPoderoso, para siempre reinará',
    initialPhrase: 'Yo quiero estar, adorandote Señor',
    artist: {
      name: 'Job Gonzalez',
      slug: 'job-gonzalez',
    },
    categories: ['Adoración'],
  },
  {
    title: 'Tu nombre es como miel',
    lyrics:
      '[F] [C] [A#] \n // Jesús // \n[F]    [C]   [A#] \nSanto y Ungido \n[F] [C] [A#] \nJesús \n\n[F]        [C]    [A#] \nLevantado y exaltado \n[F] [C] [A#] \nJesús \n\n                    [A#] \nTu Nombre es como miel \n            [F] \nEn mis labios \n                   [A#] \nTu Espíritu como agua \n          [F] \nPara mi ser \n            [A#] \nTu Palabra es \n        [C]     [Dm] \n Lampara a mis pies \n            [A#] \n Cristo Te amo \n [Gm]    [C] \n Te amo \n',
    initialPhrase: 'Jesús, Santo y Ungido...',
    artist: {
      name: 'La Roca',
      slug: 'la-roca',
    },
    categories: ['Adoración'],
  },
];
