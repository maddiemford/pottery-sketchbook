import type { Piece } from '../types/piece'

export const samplePieces: Piece[] = [
  {
    id: '1',
    title: 'Speckled Mug',
    createdAt: '2026-08-02',
    clayBody: 'Speckled Buff Stoneware',
    measurementsBeforeFiring: { heightCm: 11, widthCm: 8.5, weightG: 420 },
    notes: 'Wide handle, thumb rest on top. First try at a pulled handle.',
    firings: [
      {
        id: '1a',
        label: 'Bisque',
        date: '2026-08-10',
        coneOrTemp: 'Cone 04',
        glaze: '',
        measurementsAfter: { heightCm: 10.2, widthCm: 7.9, weightG: 360 },
        notes: 'Even shrinkage, no cracks.',
      },
      {
        id: '1b',
        label: 'Glaze',
        date: '2026-08-24',
        coneOrTemp: 'Cone 6',
        glaze: 'Amber Celadon over white slip',
        measurementsAfter: { heightCm: 9.8, widthCm: 7.6, weightG: 340 },
        notes: 'Glaze pooled nicely in the throwing lines. Slight drip near base.',
      },
    ],
  },
  {
    id: '2',
    title: 'Bud Vase No. 3',
    createdAt: '2026-09-01',
    clayBody: 'Porcelain',
    measurementsBeforeFiring: { heightCm: 16, widthCm: 6 },
    notes: 'Trying a narrower neck than No. 2. Trimmed foot ring by hand.',
    firings: [],
  },
]
