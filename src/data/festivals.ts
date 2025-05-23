import {FestivalDetails} from "../types/Festival.ts";
import Cairo from '../assets/CU.png';


export const festivalDetails: FestivalDetails[] = [{
    id: '1',
    name: 'مهرجان جامعة القاهرة للعروض الطويلة',
    startDate: '2025-04-26',
    endDate: '2025-05-16',
    status: 'Running',
    organizer: 'قطاع الأنشطة الثقافية – جامعة القاهرة',
    participants: ['طلاب الجامعات', 'فرق مستقلة', 'ضيوف شرف'],
    jury: [
        'د. أحمد كمال – أستاذ الإخراج المسرحي',
        'د. نهى عبد الحميد – ناقدة مسرحية',
        'أ. محمود سامي – فنان وعضو نقابة المهن التمثيلية'
    ],
    awards: {
        best_play: 'هاملت',
        best_director: 'وليم شكسبير',
        best_actor: 'وليم شكسبير',
        best_actress: 'إلين مكلافلين',
        best_stage_design: 'برت بريشت',
        jury_award: 'أنتوان آرتو'
    },
    extra_details: [
        'اعتذرت الكليات الآتية تربية نوعية'
    ],
    logo: Cairo

}]

export const getFestivalById = (id: string): FestivalDetails | undefined => {
    return festivalDetails.find(festival => festival.id === id);
};
