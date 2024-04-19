// import { CronJob } from 'cron';
// export default {
//     // agreementDecline: new CronJob('0 0 9 * * 1', async () => {
//     //     console.log('Cron start');
//     //
//     //     const today = new Date();
//     //     await Agreement.update(
//     //         {
//     //             state: 'DECLINED',
//     //         },
//     //         {
//     //             include: {
//     //                 model: Intership,
//     //                 as: 'intership',
//     //                 required: true,
//     //                 where: {
//     //                     beginDate: {
//     //                         [Op.lt]: today,
//     //                     },
//     //                 },
//     //             },
//     //             where: {
//     //                 state: 'NEW',
//     //             },
//     //         }
//     //     );
//     //
//     //     console.log('Cron end');
//     // }),
// };
