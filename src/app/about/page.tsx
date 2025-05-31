"use client";

import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">من نحن</h1>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                alt="Homey Store"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6 text-right">
              <h2 className="text-2xl font-semibold text-primary">Homey Store</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                وجهتك الأولى للموضة ومنتجات اللايفستايل في مصر. نقدم لكِ أحدث صيحات الموضة والأزياء العصرية بأسعار مناسبة وجودة عالية.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                نحن نؤمن بأن الأناقة حق للجميع، ولذلك نحرص على توفير تشكيلة واسعة من الملابس والإكسسوارات التي تناسب جميع الأذواق والمناسبات.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary mb-2">رؤيتنا</h3>
                  <p className="text-gray-600">أن نكون الوجهة المفضلة للتسوق العصري في مصر</p>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary mb-2">مهمتنا</h3>
                  <p className="text-gray-600">تقديم أحدث صيحات الموضة بأسعار مناسبة</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">جودة عالية</h3>
              <p className="text-gray-600">نختار منتجاتنا بعناية لنضمن لكم أفضل جودة</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">أسعار مناسبة</h3>
              <p className="text-gray-600">نقدم أفضل الأسعار التنافسية في السوق</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-2">خدمة متميزة</h3>
              <p className="text-gray-600">فريقنا جاهز لمساعدتكم في أي وقت</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 