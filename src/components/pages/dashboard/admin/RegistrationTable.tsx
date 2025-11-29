"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Registration } from "@/types/registration.md";
import { updateRegistrationStatus } from "@/lib/registration";
import { toast } from "sonner";

interface RegistrationTableProps {
  registrations: Registration[];
}

export default function RegistrationTable({ registrations }: RegistrationTableProps) {
  const [data, setData] = useState(registrations);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const handleStatusChange = async (id: string, newStatus: "pending" | "confirmed" | "cancelled") => {
    setIsUpdating(id);
    try {
      const result = await updateRegistrationStatus(id, newStatus);
      if (result.success) {
        setData((prev) =>
          prev.map((reg) =>
            reg.id === id ? { ...reg, status: newStatus, paymentStatus: newStatus === "confirmed" } : reg
          )
        );
        toast.success(`Status berhasil diubah ke ${newStatus}`);
      } else {
        toast.error(result.error || "Gagal mengubah status");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsUpdating(null);
    }
  };

  const filteredData = data.filter((reg) => {
    const matchesSearch =
      reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phoneNumber.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || reg.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      confirmed: "bg-green-100 text-green-800 border-green-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getCategoryBadge = (category: string) => {
    return category === "CATEGORY_5K"
      ? "bg-blue-100 text-blue-800 border-blue-300"
      : "bg-purple-100 text-purple-800 border-purple-300";
  };

  return (
    <div className="w-full space-y-4">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-impact text-white">Data Registrasi</h2>
          <p className="text-white/70 text-sm">Total: {filteredData.length} peserta</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="bg-yellow-500/20 border border-yellow-500 px-3 py-1 rounded-lg">
            <span className="text-yellow-300 text-sm">
              Pending: {data.filter((r) => r.status === "pending").length}
            </span>
          </div>
          <div className="bg-green-500/20 border border-green-500 px-3 py-1 rounded-lg">
            <span className="text-green-300 text-sm">
              Confirmed: {data.filter((r) => r.status === "confirmed").length}
            </span>
          </div>
          <div className="bg-red-500/20 border border-red-500 px-3 py-1 rounded-lg">
            <span className="text-red-300 text-sm">
              Cancelled: {data.filter((r) => r.status === "cancelled").length}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Cari nama, email, atau nomor telepon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#4BCFFC]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border-2 border-white/20 bg-white/10 text-white focus:outline-none focus:border-[#4BCFFC]"
        >
          <option value="all" className="bg-background">Semua Status</option>
          <option value="pending" className="bg-background">Pending</option>
          <option value="confirmed" className="bg-background">Confirmed</option>
          <option value="cancelled" className="bg-background">Cancelled</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border-2 border-white/20 bg-white/10 text-white focus:outline-none focus:border-[#4BCFFC]"
        >
          <option value="all" className="bg-background">Semua Kategori</option>
          <option value="CATEGORY_5K" className="bg-background">5K Run</option>
          <option value="CATEGORY_10K" className="bg-background">10K Run</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-bold text-background">No</TableHead>
                <TableHead className="font-bold text-background">Nama</TableHead>
                <TableHead className="font-bold text-background">Email</TableHead>
                <TableHead className="font-bold text-background">Telepon</TableHead>
                <TableHead className="font-bold text-background">Kategori</TableHead>
                <TableHead className="font-bold text-background">Jersey</TableHead>
                <TableHead className="font-bold text-background">Status</TableHead>
                <TableHead className="font-bold text-background">Pembayaran</TableHead>
                <TableHead className="font-bold text-background">Tanggal Daftar</TableHead>
                <TableHead className="font-bold text-background">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                    Tidak ada data registrasi
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((reg, index) => (
                  <TableRow key={reg.id} className="hover:bg-gray-50">
                    <TableCell className="text-background font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="text-background font-medium">{reg.fullName}</div>
                      <div className="text-gray-500 text-xs">{reg.city}</div>
                    </TableCell>
                    <TableCell className="text-background">{reg.email}</TableCell>
                    <TableCell className="text-background">{reg.phoneNumber}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryBadge(reg.category)}`}>
                        {reg.category === "CATEGORY_5K" ? "5K" : "10K"}
                      </span>
                    </TableCell>
                    <TableCell className="text-background">{reg.jerseySize}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(reg.status)}`}>
                        {reg.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {reg.paymentProofUrl ? (
                        <a
                          href={reg.paymentProofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4BCFFC] hover:underline text-sm"
                        >
                          Lihat Bukti
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">Belum upload</span>
                      )}
                    </TableCell>
                    <TableCell className="text-background text-sm">
                      {formatDate(reg.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {reg.status !== "confirmed" && (
                          <button
                            onClick={() => handleStatusChange(reg.id, "confirmed")}
                            disabled={isUpdating === reg.id}
                            className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50"
                          >
                            {isUpdating === reg.id ? "..." : "✓"}
                          </button>
                        )}
                        {reg.status !== "cancelled" && (
                          <button
                            onClick={() => handleStatusChange(reg.id, "cancelled")}
                            disabled={isUpdating === reg.id}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50"
                          >
                            {isUpdating === reg.id ? "..." : "✗"}
                          </button>
                        )}
                        {reg.status !== "pending" && (
                          <button
                            onClick={() => handleStatusChange(reg.id, "pending")}
                            disabled={isUpdating === reg.id}
                            className="px-2 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 disabled:opacity-50"
                          >
                            {isUpdating === reg.id ? "..." : "↺"}
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Detail Modal could be added here */}
    </div>
  );
}