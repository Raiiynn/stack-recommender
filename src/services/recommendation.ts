import mongoose from 'mongoose';

const RecommendationSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  recommendation: { type: String, required: true },
}, { timestamps: true });

export const Recommendation = mongoose.models.Recommendation || mongoose.model('Recommendation', RecommendationSchema);
